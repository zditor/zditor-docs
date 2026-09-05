#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { execFile as execFileCallback } from 'node:child_process';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseArgs, promisify } from 'node:util';
import { pathToFileURL } from 'node:url';

const execFile = promisify(execFileCallback);
const manifestPath = 'assets/r2-manifest.json';
const mimeTypes = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.gif': 'image/gif', '.webp': 'image/webp',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4',
  '.aac': 'audio/aac', '.flac': 'audio/flac', '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4', '.mov': 'video/quicktime', '.m4v': 'video/mp4',
  '.webm': 'video/webm', '.pdf': 'application/pdf', '.json': 'application/json',
};
const sha256 = data => createHash('sha256').update(data).digest('hex');
const json = data => JSON.stringify(data, null, 2) + '\n';
const git = async (...args) => (await execFile('git', args, { maxBuffer: 10 * 1024 * 1024 })).stdout;
const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function publicURL(base, key) {
  const url = new URL(base);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('Public base URL must be an HTTPS URL without credentials, query or fragment.');
  }
  const encoded = key.split('/').map(part => encodeURIComponent(part)
    .replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())).join('/');
  return `${url.href.replace(/\/$/, '')}/${encoded}`;
}

export function rewriteReferences(text, filename, assets, sourceRoot) {
  const replacements = new Map();
  for (const asset of assets) {
    const relative = path.posix.relative(path.posix.dirname(filename), asset.path);
    const aliases = [asset.path, '/' + asset.path, relative, path.join(sourceRoot, asset.path)];
    if (!relative.startsWith('../')) aliases.push('./' + relative);
    for (const alias of aliases) {
      replacements.set(alias, asset.url);
      replacements.set(encodeURI(alias), asset.url);
    }
  }
  // Exact known paths cover Markdown, HTML, YAML and Zditor's |mode=... suffixes.
  // Boundaries prevent matching inside existing external URLs or longer filenames.
  const pattern = new RegExp('(^|[\\s("\'`<])(' + [...replacements.keys()]
    .sort((a, b) => b.length - a.length).map(escapeRegExp).join('|') +
    ')(?=$|[\\s)"\'`>|?#])', 'gm');
  return text.replace(pattern, (_, before, value) => before + replacements.get(value));
}

export function rewriteJSON(value, filename, assets, sourceRoot) {
  if (typeof value === 'string') {
    // Old annotation sidecars can contain absolute paths from a different machine.
    const absoluteAsset = value.startsWith('/') && assets.find(a => value.endsWith('/' + a.path));
    return absoluteAsset ? absoluteAsset.url : rewriteReferences(value, filename, assets, sourceRoot);
  }
  if (Array.isArray(value)) return value.map(v => rewriteJSON(v, filename, assets, sourceRoot));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewriteJSON(v, filename, assets, sourceRoot)]));
  }
  return value;
}

export async function payload(asset, manifest, sourceRoot) {
  const data = await readFile(path.join(sourceRoot, asset.path));
  return asset.lfs ? data : Buffer.from(json(rewriteJSON(JSON.parse(data), asset.path, manifest.assets, sourceRoot)));
}

function checkBytes(data, asset) {
  if (data.length !== asset.size || sha256(data) !== asset.sha256) {
    throw new Error(`Size or SHA-256 mismatch: ${asset.path}`);
  }
}

async function plan(options) {
  const prefix = options.prefix || 'v1';
  if (!/^[a-zA-Z0-9][a-zA-Z0-9/_-]*$/.test(prefix) || prefix.endsWith('/')) {
    throw new Error('Prefix must be a nonempty object directory without a trailing slash.');
  }
  const base = options['public-base-url'] || 'https://docs-assets.zditor.com';
  const sourceRef = (await git('rev-parse', options['source-ref'] || 'HEAD')).trim();
  const { files } = JSON.parse(await git('lfs', 'ls-files', '--json', sourceRef));
  if (!files.length) throw new Error('No LFS files found at the source commit.');
  const manifest = { version: 1, source_ref: sourceRef, public_base_url: base, key_prefix: prefix, assets: [] };
  for (const file of files) {
    const key = `${prefix}/${file.name}`;
    const asset = {
      path: file.name, key, url: publicURL(base, key), size: file.size,
      sha256: file.oid, content_type: mimeTypes[path.extname(file.name)], lfs: true,
    };
    if (!asset.content_type) throw new Error(`Unknown content type: ${file.name}`);
    checkBytes(await readFile(file.name), asset);
    manifest.assets.push(asset);
  }
  const tracked = (await git('ls-files', '-z')).split('\0').filter(Boolean);
  for (const filename of tracked.filter(f => f.endsWith('.zditor-pdf-annotation.json'))) {
    const key = `${prefix}/${filename}`;
    const asset = { path: filename, key, url: publicURL(base, key), content_type: 'application/json', lfs: false };
    const data = await payload(asset, manifest, process.cwd());
    manifest.assets.push({ ...asset, size: data.length, sha256: sha256(data) });
  }
  await writeFile(manifestPath, json(manifest));
  console.log(`Recorded ${files.length} LFS files and ${manifest.assets.length - files.length} annotation sidecars in ${manifestPath}.`);
}

async function loadManifest() {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  if (manifest.version !== 1 || !manifest.assets?.length) throw new Error('Invalid asset manifest.');
  const paths = new Set();
  for (const asset of manifest.assets) {
    if (asset.path.startsWith('/') || asset.path.split('/').some(p => !p || p === '..' || p === '.') ||
        paths.has(asset.path) || asset.key !== `${manifest.key_prefix}/${asset.path}` ||
        asset.url !== publicURL(manifest.public_base_url, asset.key) ||
        !/^[a-f0-9]{64}$/.test(asset.sha256) || !Number.isSafeInteger(asset.size) || asset.size <= 0) {
      throw new Error(`Invalid asset entry: ${asset.path}`);
    }
    paths.add(asset.path);
  }
  return manifest;
}

async function forEachAsset(assets, fn) {
  let next = 0;
  let complete = 0;
  const errors = [];
  await Promise.all(Array.from({ length: Math.min(6, assets.length) }, async () => {
    while (next < assets.length) {
      const asset = assets[next++];
      try { await fn(asset); } catch (error) { errors.push(error); }
      complete++;
      if (complete % 20 === 0 || complete === assets.length) console.log(`Processed ${complete}/${assets.length} assets.`);
    }
  }));
  if (errors.length) throw new AggregateError(errors, errors.map(e => e.message).join('\n'));
}

export async function verifyAsset(asset) {
  const response = await fetch(asset.url, { signal: AbortSignal.timeout(120000) });
  if (!response.ok) throw new Error(`Public URL returned HTTP ${response.status}: ${asset.path}`);
  const type = response.headers.get('content-type')?.split(';')[0];
  if (type !== asset.content_type) throw new Error(`Unexpected Content-Type ${type}: ${asset.path}`);
  checkBytes(Buffer.from(await response.arrayBuffer()), asset);
}

async function upload(manifest, sourceRoot) {
  const bucket = process.env.R2_BUCKET_NAME;
  const endpoint = process.env.R2_ENDPOINT_URL || (process.env.R2_ACCOUNT_ID &&
    `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`);
  if (!bucket || !endpoint) throw new Error('Set R2_BUCKET_NAME and R2_ENDPOINT_URL (or R2_ACCOUNT_ID).');
  const env = { ...process.env, AWS_DEFAULT_REGION: 'auto', AWS_REGION: 'auto', AWS_PAGER: '' };
  if (env.R2_ACCESS_KEY_ID) env.AWS_ACCESS_KEY_ID = env.R2_ACCESS_KEY_ID;
  if (env.R2_SECRET_ACCESS_KEY) env.AWS_SECRET_ACCESS_KEY = env.R2_SECRET_ACCESS_KEY;
  const aws = args => execFile('aws', ['--endpoint-url', endpoint, '--region', 'auto', ...args], { env });
  // Validate the entire local snapshot before the first remote write.
  for (const asset of manifest.assets) checkBytes(await payload(asset, manifest, sourceRoot), asset);
  const staging = await mkdtemp(path.join(tmpdir(), 'zditor-r2-'));
  try {
    await forEachAsset(manifest.assets, async asset => {
      let existing;
      try {
        existing = JSON.parse((await aws(['s3api', 'head-object', '--bucket', bucket, '--key', asset.key, '--output', 'json'])).stdout);
      } catch (error) {
        if (!/\(404\)|Not Found|NoSuchKey/.test(error.stderr || '')) throw new Error(`Cannot inspect R2 object: ${asset.path}`);
      }
      if (existing) {
        if (existing.ContentLength === asset.size && existing.Metadata?.sha256 === asset.sha256 &&
            existing.ContentType === asset.content_type) return;
        throw new Error(`R2 object already exists with different content or metadata: ${asset.path}`);
      }
      const filename = path.join(staging, asset.path);
      await mkdir(path.dirname(filename), { recursive: true });
      await writeFile(filename, await payload(asset, manifest, sourceRoot));
      await aws(['s3', 'cp', filename, `s3://${bucket}/${asset.key}`, '--only-show-errors',
        '--content-type', asset.content_type, '--cache-control', 'public, max-age=86400',
        '--metadata', `sha256=${asset.sha256}`]);
    });
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
  console.log('Upload complete.');
}

async function migrationChanges(manifest) {
  const tracked = (await git('ls-files', '-z')).split('\0').filter(Boolean);
  const changes = [];
  for (const filename of tracked.filter(f => f.endsWith('.md') || f.endsWith('.zditor-pdf-annotation.json'))) {
    const original = await readFile(filename, 'utf8');
    const content = filename.endsWith('.json')
      ? json(rewriteJSON(JSON.parse(original), filename, manifest.assets, process.cwd()))
      : rewriteReferences(original, filename, manifest.assets, process.cwd());
    if (content !== original) changes.push({ filename, content });
  }
  return changes;
}

async function migrate(manifest, apply) {
  const changes = await migrationChanges(manifest);
  const files = manifest.assets.filter(a => a.lfs).map(a => a.path);
  console.log(`${changes.length} documents to update; ${files.length} LFS files to untrack.`);
  if (!apply) {
    console.log('Dry run. Use migrate --apply to verify public downloads, rewrite references and untrack media.');
    return;
  }
  for (const asset of manifest.assets) checkBytes(await payload(asset, manifest, process.cwd()), asset);
  console.log('Verifying all public downloads before modifying documents or the Git index...');
  await forEachAsset(manifest.assets, verifyAsset);
  const attributes = await readFile('.gitattributes', 'utf8');
  const ignore = await readFile('.gitignore', 'utf8');
  await git('rm', '--cached', '--quiet', '--', ...files);
  for (const { filename, content } of changes) await writeFile(filename, content);
  const remainingAttributes = attributes.split('\n').filter(line => !/\bfilter=lfs\b/.test(line)).join('\n');
  await writeFile('.gitattributes', remainingAttributes.trim() ? remainingAttributes :
    '# Media is hosted on R2. See docs/r2-assets.md.\n');
  const ignored = files.map(f => '/' + f.replace(/[\\*?[\]]/g, '\\$&')).join('\n');
  await writeFile('.gitignore', ignore.trimEnd() + '\n\n# Media migrated to R2; keep local originals out of Git.\n' + ignored + '\n');
  console.log('References migrated and LFS rules removed. Local media files remain on disk; Git history is unchanged.');
}

async function main() {
  const { values, positionals } = parseArgs({ allowPositionals: true, options: {
    'public-base-url': { type: 'string' }, prefix: { type: 'string' },
    'source-ref': { type: 'string' }, 'source-root': { type: 'string' }, apply: { type: 'boolean' },
  } });
  const [command] = positionals;
  if (command === 'plan') return plan(values);
  if (!['upload', 'verify', 'migrate'].includes(command)) {
    throw new Error('Usage: node scripts/r2-assets.mjs <plan|upload|verify|migrate> [--apply] [--source-root DIR]');
  }
  const manifest = await loadManifest();
  if (command === 'upload') return upload(manifest, path.resolve(values['source-root'] || '.'));
  if (command === 'verify') return forEachAsset(manifest.assets, verifyAsset);
  return migrate(manifest, values.apply);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
