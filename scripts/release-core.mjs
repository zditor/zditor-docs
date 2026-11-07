import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

export function stableVersion(version) {
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) throw new Error('Expected a stable major.minor.patch version');
  return version;
}
export function validatePlan({ sourceVersion, configVersion, requestedVersion = '', desktop, ios, android, publish, cloudflare, androidMode = 'release' }) {
  const version = stableVersion(requestedVersion.trim() || sourceVersion);
  if (version !== sourceVersion || version !== configVersion) throw new Error('Version must match package.json and tauri.conf.json; update the application source first');
  const deliveryOnly = !desktop && !ios && !android;
  if (deliveryOnly && !(publish && cloudflare)) throw new Error('Select a platform, or use publish + cloudflare to retry R2 delivery only');
  if (cloudflare && (!publish || (!desktop && !android && !deliveryOnly))) throw new Error('R2 requires publish and desktop/Android assets');
  if (android) {
    if (!['release', 'debug'].includes(androidMode) || (publish && androidMode !== 'release')) throw new Error('Android publishing requires release mode');
    const [major, minor, patch] = version.split('.').map(Number);
    const code = major * 1_000_000 + minor * 1000 + patch;
    if (minor > 999 || patch > 999 || !Number.isSafeInteger(code) || code < 1 || code > 2_100_000_000) throw new Error('Version cannot be encoded as an Android versionCode');
  }
  return { version, desktop, ios, android, publish, cloudflare, deliveryOnly };
}
export function releaseNotes(root, version) {
  const sections = [];
  for (const [file, language] of [['CHANGELOG.md', 'English'], ['CHANGELOG.zh-CN.md', '中文'], ['CHANGELOG.de-DE.md', 'Deutsch']]) {
    if (!fs.existsSync(path.join(root, file))) continue;
    const lines = fs.readFileSync(path.join(root, file), 'utf8').split('\n');
    const start = lines.findIndex(line => line.trim() === `## v${version}`);
    if (start < 0) continue;
    const tail = lines.slice(start + 1);
    const end = tail.findIndex(line => /^## /.test(line));
    const body = tail.slice(0, end < 0 ? undefined : end).join('\n').trim();
    if (body) sections.push(`## ${language}\n\n${body}`);
  }
  return sections.join('\n\n') || `Zditor v${version}`;
}
export function assertDraft(release, marker) {
  if (!release.draft) throw new Error('This version is already public. Choose a new version or retry R2 with all platforms unchecked');
  if (!release.body?.includes(marker)) throw new Error('Existing draft has a different source/platform selection. Use the same selection or remove the obsolete draft explicitly');
}
export function rewriteUpdater(updater, { version, repository, filenames, baseUrl }) {
  stableVersion(version);
  if (updater.version?.replace(/^v/, '') !== version || !updater.platforms || !Object.keys(updater.platforms).length) throw new Error('Missing updater platforms or incorrect version');
  const base = new URL(baseUrl);
  if (base.protocol !== 'https:' || base.search || base.hash || base.pathname !== '/') throw new Error('Download base must be an HTTPS origin');
  const prefix = `https://github.com/${repository}/releases/download/zditor-v${version}/`;
  const result = structuredClone(updater);
  for (const [key, platform] of Object.entries(updater.platforms)) {
    if (typeof platform.signature !== 'string' || !platform.signature.trim() || !platform.url?.startsWith(prefix)) throw new Error('Invalid updater signature or release URL');
    const encoded = platform.url.slice(prefix.length);
    const filename = decodeURIComponent(encoded);
    if (!filenames.includes(filename) || encoded.includes('/') || filename.includes('/') || filename.includes('\\')) throw new Error(`Updater asset missing: ${filename}`);
    result.platforms[key] = { ...platform, url: `${base.origin}/zditor-v${version}/${encodeURIComponent(filename)}` };
  }
  return result;
}
export function mergeUpdaters(fragments, options) {
  const required = ['darwin-aarch64', 'darwin-x86_64', 'linux-x86_64', 'windows-x86_64'];
  const platforms = {};
  for (const fragment of fragments) {
    if (fragment.version?.replace(/^v/, '') !== options.version) throw new Error('Updater fragment version mismatch');
    for (const [key, value] of Object.entries(fragment.platforms || {})) {
      if (platforms[key] && JSON.stringify(platforms[key]) !== JSON.stringify(value)) throw new Error(`Conflicting updater entry: ${key}`);
      platforms[key] = value;
    }
  }
  for (const key of required) if (!platforms[key]) throw new Error(`Missing desktop updater platform: ${key}`);
  const updater = { ...fragments[0], platforms };
  rewriteUpdater(updater, { ...options, baseUrl: 'https://download.zditor.com' });
  return updater;
}
export function assertNoDowngrade(currentVersion, nextVersion) {
  const current = stableVersion(currentVersion.replace(/^v/, '')).split('.').map(Number);
  const next = stableVersion(nextVersion).split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (next[i] > current[i]) return;
    if (next[i] < current[i]) throw new Error('Refusing to downgrade the R2 updater');
  }
}
function gh(args) { return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim(); }
function output(values) { for (const [key, value] of Object.entries(values)) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`); }
function required(names) { for (const name of names) if (!process.env[name]) throw new Error(`Configure ${name} before running this selection`); }
function main() {
  const command = process.argv[2];
  if (command === 'prepare') {
    const selected = Object.fromEntries(['desktop', 'ios', 'android', 'publish', 'cloudflare'].map(key => [key, process.env[key.toUpperCase()] === 'true']));
    const pkg = JSON.parse(fs.readFileSync('zditor/package.json', 'utf8'));
    const config = JSON.parse(fs.readFileSync('zditor/src-tauri/tauri.conf.json', 'utf8'));
    const plan = validatePlan({ sourceVersion: pkg.version, configVersion: config.version, requestedVersion: process.env.RELEASE_VERSION, androidMode: process.env.ANDROID_MODE, ...selected });
    if (plan.desktop || (plan.android && plan.publish) || plan.deliveryOnly) required(['GH_TOKEN']);
    if (plan.android && plan.publish) required(['ANDROID_KEYSTORE_BASE64', 'ANDROID_KEYSTORE_PASSWORD', 'ANDROID_KEY_ALIAS', 'ANDROID_KEY_PASSWORD']);
    if (plan.cloudflare) required(['R2_ACCOUNT_ID', 'R2_BUCKET_NAME', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY']);
    const source = execFileSync('git', ['-C', 'zditor', 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    if (!plan.deliveryOnly) {
      const pins = ['tauri-cef.ref', 'zditor-excalidraw.ref'].map(file => fs.readFileSync(`zditor/${file}`, 'utf8').trim());
      if (pins.some(pin => !/^[a-f0-9]{40}$/.test(pin))) throw new Error('Pin Tauri and Excalidraw to full commit SHAs in the application repository');
      if (plan.ios) {
        const dependencies = JSON.parse(fs.readFileSync('zditor/scripts/testflight/dependencies.json', 'utf8'));
        if (dependencies.tauri.revision !== pins[0] || dependencies.excalidraw.revision !== pins[1] || dependencies.tauri.repository !== (process.env.TAURI_CEF_REPO || 'zizdlp/tauri-cef') || dependencies.excalidraw.repository !== process.env.EXCALIDRAW_REPO) throw new Error('iOS dependency pins/repositories must match desktop and Android');
      }
    }
    const tag = `zditor-v${plan.version}`;
    let releaseId = '';
    if (plan.desktop || (plan.android && plan.publish) || plan.deliveryOnly) {
      const repository = process.env.GITHUB_REPOSITORY;
      const releases = JSON.parse(gh(['api', '--paginate', '--slurp', `repos/${repository}/releases?per_page=100`])).flat();
      const existing = releases.find(release => release.tag_name === tag);
      const marker = `<!-- zditor-release:${JSON.stringify({ source, desktop: plan.desktop, ios: plan.ios, android: plan.android })} -->`;
      if (plan.deliveryOnly) {
        if (!existing || existing.draft) throw new Error('R2 retry requires an already published GitHub Release');
        if (!existing.body?.includes(`"source":"${source}"`)) throw new Error('R2 retry source_ref does not match the published release');
        output({ promote_latest: existing.body.includes('"desktop":true') });
      } else if (existing) {
        assertDraft(existing, marker);
        releaseId = String(existing.id);
      } else {
        fs.writeFileSync('release-notes.md', `${releaseNotes('zditor', plan.version)}\n\n${marker}\n`);
        gh(['release', 'create', tag, '--repo', repository, '--target', process.env.GITHUB_SHA, '--title', `Zditor v${plan.version}`, '--notes-file', 'release-notes.md', '--draft']);
        releaseId = gh(['api', `repos/${repository}/releases`, '--jq', `.[] | select(.tag_name == "${tag}") | .id`]);
        if (!/^\d+$/.test(releaseId)) throw new Error('Failed to resolve prepared release');
      }
    }
    output({ version: plan.version, source, tag, release_id: releaseId, delivery_only: plan.deliveryOnly });
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Release plan\n\nVersion: ${plan.version}\n\nApplication commit: ${source}\n\nDesktop: ${plan.desktop}; iOS: ${plan.ios}; Android: ${plan.android}; publish: ${plan.publish}; R2: ${plan.cloudflare}\n`);
  } else if (command === 'finalize') {
    const version = stableVersion(process.env.RELEASE_VERSION);
    const tag = `zditor-v${version}`;
    const repository = process.env.GITHUB_REPOSITORY;
    const release = JSON.parse(gh(['release', 'view', tag, '--repo', repository, '--json', 'isDraft,assets,body']));
    if (!release.isDraft || !release.body.includes(`"source":"${process.env.SOURCE_COMMIT}"`)) throw new Error('Expected the prepared draft and source');
    const filenames = release.assets.filter(asset => asset.size > 0).map(asset => asset.name);
    if (process.env.ANDROID === 'true') {
      const prefix = `Zditor_${version}_android_${process.env.ANDROID_TARGET}`;
      for (const suffix of ['.apk', '.aab', '.build-info.json', '.SHA256SUMS']) {
        if (!filenames.includes(prefix + suffix)) throw new Error(`Missing signed Android asset: ${prefix + suffix}`);
      }
    }
    if (process.env.DESKTOP === 'true') {
      const fragments = fs.readdirSync('desktop-updaters').map(directory => JSON.parse(fs.readFileSync(path.join('desktop-updaters', directory, 'platform-updater.json'), 'utf8')));
      const updater = mergeUpdaters(fragments, { version, repository, filenames });
      const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'zditor-updater-'));
      try {
        const file = path.join(temporary, 'latest.json');
        fs.writeFileSync(file, `${JSON.stringify(updater, null, 2)}\n`);
        gh(['release', 'upload', tag, '--repo', repository, '--clobber', file]);
      } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
    }
    gh(['release', 'edit', tag, '--repo', repository, '--draft=false', `--latest=${process.env.DESKTOP === 'true'}`]);
  } else if (command === 'rewrite-updater') {
    const root = process.env.RELEASE_ASSETS_DIR;
    const updater = rewriteUpdater(JSON.parse(fs.readFileSync(path.join(root, 'latest.json'), 'utf8')), {
      version: process.env.RELEASE_VERSION, repository: process.env.GITHUB_REPOSITORY,
      filenames: fs.readdirSync(root), baseUrl: process.env.RELEASE_DOWNLOAD_BASE_URL,
    });
    fs.writeFileSync(path.join(root, 'latest.json'), `${JSON.stringify(updater, null, 2)}\n`);
  } else if (command === 'check-updater') {
    assertNoDowngrade(JSON.parse(fs.readFileSync(process.argv[3], 'utf8')).version, process.env.RELEASE_VERSION);
  } else throw new Error('Expected prepare, finalize, rewrite-updater or check-updater');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
