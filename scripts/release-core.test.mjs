import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validatePlan, assertDraft, rewriteUpdater, assertNoDowngrade, releaseNotes, mergeUpdaters, findRelease, githubCommand } from './release-core.mjs';
const scripts = path.dirname(fileURLToPath(import.meta.url));
const plan = { sourceVersion: '2.0.5', configVersion: '2.0.5', desktop: true, ios: true, android: true, publish: true, cloudflare: true };
test('one source version and valid platform/delivery selection are required', () => {
  assert.equal(validatePlan(plan).version, '2.0.5');
  assert.throws(() => validatePlan({ ...plan, androidMode: 'debug' }), /requires release/);
  assert.doesNotThrow(() => validatePlan({ ...plan, publish: false, cloudflare: false, androidMode: 'debug' }));
  assert.throws(() => validatePlan({ ...plan, requestedVersion: '2.0.6' }), /must match/);
  assert.throws(() => validatePlan({ ...plan, publish: false }), /R2 requires/);
  assert.throws(() => validatePlan({ ...plan, desktop: false, android: false }), /R2 requires/);
  assert.throws(() => validatePlan({ ...plan, sourceVersion: '2.1000.0', configVersion: '2.1000.0' }), /versionCode/);
  assert.equal(validatePlan({ ...plan, desktop: false, ios: false, android: false }).deliveryOnly, true);
});
test('published releases and drafts from another source/selection cannot receive builds', () => {
  assert.doesNotThrow(() => assertDraft({ draft: true, body: 'notes marker' }, 'marker'));
  assert.throws(() => assertDraft({ draft: false, body: 'marker' }, 'marker'), /already public/);
  assert.throws(() => assertDraft({ draft: true, body: 'other' }, 'marker'), /different source/);
});
const filename = 'Zditor_2.0.5_aarch64.app.tar.gz';
const updater = { version: '2.0.5', platforms: { 'darwin-aarch64': { signature: 'signed', url: `https://github.com/zditor/zditor-docs/releases/download/zditor-v2.0.5/${filename}` } } };
const options = { version: '2.0.5', repository: 'zditor/zditor-docs', filenames: [filename], baseUrl: 'https://download.zditor.com' };
const notes = '## English\n\nFix logo.\n\n## 中文\n\n修复图标。';
const releaseMarker = '<!-- zditor-release:{"source":"test-source"} -->';
const releaseBody = `${notes}\n\n${releaseMarker}\n`;
test('updater rewriting requires signed assets from this exact release', () => {
  const rewritten = rewriteUpdater(updater, options);
  assert.equal(rewritten.platforms['darwin-aarch64'].url, `https://download.zditor.com/zditor-v2.0.5/${filename}`);
  assert.ok(updater.platforms['darwin-aarch64'].url.startsWith('https://github.com/'));
  assert.throws(() => rewriteUpdater(updater, { ...options, filenames: [] }), /missing/);
  assert.throws(() => rewriteUpdater(updater, { ...options, version: '2.0.6' }), /incorrect version/);
  const invalid = structuredClone(updater);
  invalid.platforms['darwin-aarch64'].url = 'https://evil.example/a';
  assert.throws(() => rewriteUpdater(invalid, options), /Invalid updater/);
  invalid.platforms['darwin-aarch64'] = { ...updater.platforms['darwin-aarch64'], signature: '' };
  assert.throws(() => rewriteUpdater(invalid, options), /Invalid updater/);
});
test('updater may advance or retry but cannot downgrade', () => {
  assert.doesNotThrow(() => assertNoDowngrade('v2.0.5', '2.0.5'));
  assert.doesNotThrow(() => assertNoDowngrade('2.9.9', '2.10.0'));
  assert.throws(() => assertNoDowngrade('2.10.0', '2.9.9'), /downgrade/);
});
test('release notes select only the requested changelog section', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zditor-notes-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'CHANGELOG.md'), '# Changelog\n\n## v2.0.5\n\nFix logo\n\n## v2.0.4\nOld notes');
  const notes = releaseNotes(root, '2.0.5');
  assert.match(notes, /Fix logo/);
  assert.doesNotMatch(notes, /Old notes/);
});
// Exercise the real R2 shell orchestration with fake service CLIs; no network or credentials.
function r2Fixture(t, overrides = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zditor-release-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const bin = path.join(root, 'bin'); fs.mkdirSync(bin);
  const fixtures = path.join(root, 'fixtures'); fs.mkdirSync(fixtures);
  fs.writeFileSync(path.join(fixtures, filename), 'installer');
  fs.writeFileSync(path.join(fixtures, 'latest.json'), JSON.stringify({ ...updater, notes: '' }));
  const metadata = { isDraft: false, body: releaseBody, assets: fs.readdirSync(fixtures).map(name => ({ name, size: fs.statSync(path.join(fixtures, name)).size })) };
  fs.writeFileSync(path.join(root, 'release.json'), JSON.stringify(metadata));
  const mock = `#!${process.execPath}
const fs = require('fs'), path = require('path');
const args = process.argv.slice(2), env = process.env;
const tool = path.basename(process.argv[1]);
if (tool === 'gh') {
 if (args[1] === 'view') process.stdout.write(fs.readFileSync(env.TEST_ROOT+'/release.json'));
 else if (args[1] === 'download') { if(env.FAIL_DOWNLOAD) process.exit(1); fs.cpSync(env.TEST_ROOT+'/fixtures', args[args.indexOf('--dir')+1], {recursive:true}); }
 else process.exit(2);
} else {
 if (args[1] === 'head-object') {
   if(env.FAIL_AUTH) { console.error('Forbidden (403)'); process.exit(1); }
   console.error('Not Found (404)'); process.exit(1);
 }
 const destination = args.find(arg => arg.startsWith('s3://'));
 if (!destination) process.exit(2);
 fs.appendFileSync(env.TEST_ROOT+'/uploads', destination+'\\n');
 if (destination === 's3://fake/latest.json') fs.copyFileSync(args[args.indexOf(destination) - 1], env.TEST_ROOT+'/promoted.json');
 if(env.FAIL_UPLOAD && !destination.endsWith('/latest.json')) process.exit(1);
}
`;
  for (const name of ['gh', 'aws']) fs.writeFileSync(path.join(bin, name), mock, { mode: 0o755 });
  const env = { ...process.env, ...overrides, PATH: `${bin}:${process.env.PATH}`, TEST_ROOT: root, RUNNER_TEMP: root,
    GH_TOKEN: 'fake', GITHUB_REPOSITORY: 'zditor/zditor-docs', RELEASE_VERSION: '2.0.5', R2_ACCOUNT_ID: 'fake', R2_BUCKET_NAME: 'fake',
    AWS_ACCESS_KEY_ID: 'fake', AWS_SECRET_ACCESS_KEY: 'fake', PROMOTE_LATEST: 'true',
    RELEASE_DOWNLOAD_BASE_URL: 'https://download.zditor.com', GITHUB_STEP_SUMMARY: path.join(root, 'summary'),
    CLOUDFLARE_ZONE_ID: '', CLOUDFLARE_API_TOKEN: '', R2_UPLOAD_RETRY_DELAY: '0', ...overrides };
  const result = spawnSync('bash', [path.join(scripts, 'release-r2.sh')], { env, encoding: 'utf8' });
  const uploads = fs.existsSync(path.join(root, 'uploads')) ? fs.readFileSync(path.join(root, 'uploads'), 'utf8').trim().split('\n') : [];
  const promotedPath = path.join(root, 'promoted.json');
  const promoted = fs.existsSync(promotedPath) ? JSON.parse(fs.readFileSync(promotedPath, 'utf8')) : null;
  return { ...result, uploads, promoted };
}
test('R2 uploads installers before both versioned and root updater pointers', t => {
  const result = r2Fixture(t);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.uploads.length, 3);
  assert.ok(result.uploads[0].endsWith(filename));
  assert.ok(result.uploads[1].endsWith('/zditor-v2.0.5/latest.json'));
  assert.equal(result.uploads[2], 's3://fake/latest.json');
  assert.equal(result.promoted.notes, notes);
});
for (const failure of ['FAIL_DOWNLOAD', 'FAIL_AUTH', 'FAIL_UPLOAD']) {
  test(`R2 ${failure} cannot update the root pointer`, t => {
    const result = r2Fixture(t, { [failure]: '1' });
    assert.notEqual(result.status, 0);
    assert.ok(!result.uploads.includes('s3://fake/latest.json'));
  });
}
test('Android-only R2 delivery never touches the desktop updater', t => {
  const result = r2Fixture(t, { PROMOTE_LATEST: 'false' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.uploads.length, 1);
  assert.ok(!result.uploads.some(url => url.endsWith('latest.json')));
});
function androidFixture(t, failVerification = false, overrides = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zditor-android-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const bin = path.join(root, 'bin'); fs.mkdirSync(bin);
  const tools = path.join(root, 'sdk', 'build-tools', '36.0.0'); fs.mkdirSync(tools, { recursive: true });
  for (const variant of ['apk', 'bundle']) fs.mkdirSync(path.join(root, 'android-artifacts', variant), { recursive: true });
  fs.writeFileSync(path.join(root, 'android-artifacts/apk/app-unsigned.apk'), 'unsigned-apk');
  fs.writeFileSync(path.join(root, 'android-artifacts/bundle/app.aab'), 'unsigned-aab');
  fs.writeFileSync(path.join(root, 'android-artifacts/build-info.json'), JSON.stringify({ version: '2.0.5', sourceCommit: 'a'.repeat(40), files: ['unsigned'] }));
  const mock = `#!${process.execPath}
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const args = process.argv.slice(2), name = path.basename(process.argv[1]);
fs.appendFileSync(process.env.TEST_ROOT+'/calls', name+' '+args[0]+'\\n');
if (name === 'gh') {
 if (args[1] === 'view') process.stdout.write('true');
 else fs.writeFileSync(process.env.TEST_ROOT+'/published', JSON.stringify(args));
} else if (name === 'base64') {
 const input = fs.readFileSync(0, 'utf8'); process.stdout.write(Buffer.from(input, 'base64'));
} else if (name === 'zipalign') {
 if (args[0] !== '-c') fs.copyFileSync(args.at(-2), args.at(-1));
} else if (name === 'apksigner') {
 if (args[0] === 'verify' && process.env.FAIL_VERIFY) process.exit(1);
 if (args[0] === 'sign') {
   if (process.env.ANDROID_KEY_PASSWORD !== process.env.EXPECTED_KEY_PASSWORD || args[args.indexOf('--ks-key-alias')+1] !== process.env.EXPECTED_ALIAS) process.exit(70);
   fs.copyFileSync(args.at(-1), args[args.indexOf('--out')+1]);
 }
} else if (name === 'jarsigner') {
 if (args[0] !== '-verify') fs.copyFileSync(args.at(-2), args[args.indexOf('-signedjar')+1]);
} else if (name === 'sha256sum') {
 for (const file of args) console.log(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')+'  '+file);
}
`;
  for (const name of ['gh', 'base64', 'jarsigner', 'sha256sum']) fs.writeFileSync(path.join(bin, name), mock, { mode: 0o755 });
  for (const name of ['apksigner', 'zipalign']) fs.writeFileSync(path.join(tools, name), mock, { mode: 0o755 });
  const env = { ...process.env, PATH: `${bin}:${process.env.PATH}`, TEST_ROOT: root, RUNNER_TEMP: root, ANDROID_HOME: path.join(root, 'sdk'),
    GH_TOKEN: 'fake', ANDROID_KEYSTORE_BASE64: Buffer.from('fake-key').toString('base64'), ANDROID_KEYSTORE_PASSWORD: 'fake',
    ANDROID_KEY_ALIAS: 'fake', ANDROID_KEY_PASSWORD: 'key-password', EXPECTED_KEY_PASSWORD: 'key-password', EXPECTED_ALIAS: 'fake', RELEASE_VERSION: '2.0.5', RELEASE_TARGET: 'aarch64',
    RELEASE_REPOSITORY: 'zditor/zditor-docs', BUILD_MODE: 'release', GITHUB_STEP_SUMMARY: path.join(root, 'summary'), FAIL_VERIFY: failVerification ? '1' : '', ...overrides };
  const result = spawnSync('bash', [path.join(scripts, 'release-android.sh')], { cwd: root, env, encoding: 'utf8' });
  assert.ok(!fs.readdirSync(root).some(name => name.startsWith('zditor-android-sign.')), 'temporary keystore must be removed');
  return { ...result, root, published: fs.existsSync(path.join(root, 'published')), calls: fs.readFileSync(path.join(root, 'calls'), 'utf8') };
}
test('Android aligns before signing and publishes only verified release files', t => {
  const result = androidFixture(t);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.published, true);
  assert.ok(result.calls.indexOf('zipalign -P') < result.calls.indexOf('apksigner sign'));
  assert.ok(result.calls.indexOf('apksigner verify') < result.calls.indexOf('gh release', result.calls.indexOf('gh release') + 1));
  const info = JSON.parse(fs.readFileSync(path.join(result.root, 'android-signed/Zditor_2.0.5_android_aarch64.build-info.json'), 'utf8'));
  assert.equal(info.signing, 'release');
  assert.deepEqual(info.files, ['Zditor_2.0.5_android_aarch64.apk', 'Zditor_2.0.5_android_aarch64.aab']);
});
test('Android verification failure blocks upload and removes the decoded key', t => {
  const result = androidFixture(t, true);
  assert.notEqual(result.status, 0);
  assert.equal(result.published, false);
});

test('desktop updater merge requires every platform, matching versions and consistent signatures', () => {
  const keys = ['darwin-aarch64', 'darwin-x86_64', 'linux-x86_64', 'windows-x86_64'];
  const fragments = keys.map(key => ({ version: '2.0.5', notes: '', platforms: { [key]: updater.platforms['darwin-aarch64'] } }));
  const merged = mergeUpdaters(fragments, { ...options, releaseBody });
  assert.equal(merged.notes, notes);
  assert.equal(Object.keys(merged.platforms).length, 4);
  assert.throws(() => mergeUpdaters(fragments, { ...options, releaseBody: releaseMarker }), /Missing desktop release notes/);
  assert.throws(() => mergeUpdaters(fragments.slice(0, 3), options), /Missing desktop/);
  assert.throws(() => mergeUpdaters([...fragments, { ...fragments[0], version: '2.0.4' }], options), /version mismatch/);
  assert.throws(() => mergeUpdaters([...fragments, { version: '2.0.5', platforms: { 'darwin-aarch64': { signature: 'other' } } }], options), /Conflicting/);
});

test('Android only requires keystore and password when alias/key password use defaults', t => {
  const result = androidFixture(t, false, { ANDROID_KEY_ALIAS: '', ANDROID_KEY_PASSWORD: '', EXPECTED_ALIAS: 'upload', EXPECTED_KEY_PASSWORD: 'fake' });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.published, true);
});

function githubFixture(t, mode = 'draft') {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zditor-gh-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const cli = `#!${process.execPath}
const args = process.argv.slice(2);
if (${JSON.stringify(mode)} === 'error') {
  process.stdout.write('SENSITIVE_RESPONSE_BODY');
  process.stderr.write('SENSITIVE_ERROR_BODY (HTTP 403)');
  process.exitCode = 1;
} else if (${JSON.stringify(mode)} === 'overflow') {
  process.stdout.write('SENSITIVE_RESPONSE_BODY'.repeat(500000));
} else {
  if (args[0] !== 'api' || args[1] !== 'graphql' || !args.includes('tag=zditor-v2.0.5') || args.some(arg => arg.includes('assets') || arg.includes('--paginate'))) {
    // The previous history request would return many MiB of release assets.
    process.stdout.write('HISTORY_RESPONSE'.repeat(200000));
    process.exitCode = 1;
  } else process.stdout.write(JSON.stringify({release: ${JSON.stringify(mode)} === 'missing' ? null : {
    databaseId: 123, tagName: 'zditor-v2.0.5', isDraft: ${JSON.stringify(mode)} === 'draft', description: 'release notes'
  }}));
}
`;
  fs.writeFileSync(path.join(root, 'gh'), cli, { mode: 0o755 });
  const previous = process.env.PATH;
  process.env.PATH = `${root}:${previous}`;
  t.after(() => { process.env.PATH = previous; });
}
for (const mode of ['draft', 'published']) {
  test(`release lookup finds a ${mode} without downloading historical assets`, t => {
    githubFixture(t, mode);
    assert.deepEqual(findRelease('zditor/zditor-docs', 'zditor-v2.0.5'), { id: 123, tag_name: 'zditor-v2.0.5', draft: mode === 'draft', body: 'release notes' });
  });
}
test('a missing release is distinct from GitHub access errors', t => {
  githubFixture(t, 'missing');
  assert.equal(findRelease('zditor/zditor-docs', 'zditor-v2.0.5'), null);
});
test('GitHub command failures do not attach response bodies to errors', t => {
  githubFixture(t, 'error');
  assert.throws(() => findRelease('zditor/zditor-docs', 'zditor-v2.0.5'), error => {
    assert.match(error.message, /HTTP 403/);
    assert.doesNotMatch(error.stack, /SENSITIVE/);
    assert.equal(error.stdout, undefined);
    assert.equal(error.stderr, undefined);
    return true;
  });
});
test('an oversized GitHub response yields a concise error without dumping buffers', t => {
  githubFixture(t, 'overflow');
  assert.throws(() => githubCommand(['api', 'oversized']), error => {
    assert.match(error.message, /ENOBUFS/);
    assert.ok(error.message.length < 200);
    assert.doesNotMatch(error.stack, /SENSITIVE/);
    return true;
  });
});
