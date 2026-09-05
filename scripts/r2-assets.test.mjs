import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import test from 'node:test';
import { publicURL, rewriteReferences, rewriteJSON, verifyAsset } from './r2-assets.mjs';

const assets = [
  { path: 'assets/cover.jpg', url: 'https://cdn.example.com/docs/assets/cover.jpg' },
  { path: 'assets/paper.pdf', url: 'https://cdn.example.com/docs/assets/paper.pdf' },
  { path: 'examples/talk/audio.mp3', url: 'https://cdn.example.com/docs/examples/talk/audio.mp3' },
];

test('rewrites relative, root-relative, HTML and YAML references while preserving Zditor options', () => {
  const input = '![Cover](../assets/cover.jpg)\nvalue: "../assets/cover.jpg"\n' +
    '<img src="/assets/cover.jpg">\n[Paper](/assets/paper.pdf|mode=pdf_card|highlight=abc)';
  const result = rewriteReferences(input, 'english/test.md', assets, '/repo');
  assert.equal(result, '![Cover](https://cdn.example.com/docs/assets/cover.jpg)\n' +
    'value: "https://cdn.example.com/docs/assets/cover.jpg"\n' +
    '<img src="https://cdn.example.com/docs/assets/cover.jpg">\n' +
    '[Paper](https://cdn.example.com/docs/assets/paper.pdf|mode=pdf_card|highlight=abc)');
  assert.equal(rewriteReferences('[Audio](audio.mp3|mode=audio)', 'examples/talk/doc.md', assets, '/repo'),
    '[Audio](https://cdn.example.com/docs/examples/talk/audio.mp3|mode=audio)');
});

test('does not alter external URLs, labels, or longer paths and is idempotent', () => {
  const original = '[cover.jpg](https://other.test/assets/cover.jpg)\n' +
    '[Sidecar](../assets/paper.pdf.zditor-pdf-annotation.json)\n' +
    '[Other](../assets/cover.jpg.backup)';
  assert.equal(rewriteReferences(original, 'english/test.md', assets, '/repo'), original);
  const once = rewriteReferences('[Image](../assets/cover.jpg?x=1#view)', 'english/test.md', assets, '/repo');
  assert.equal(rewriteReferences(once, 'english/test.md', assets, '/repo'), once);
  assert.ok(once.endsWith('?x=1#view)'));
});

test('encodes Unicode, spaces and Markdown delimiters in public URLs', () => {
  assert.equal(publicURL('https://cdn.example.com/', 'docs/caf\u00e9 (1).jpg'),
    'https://cdn.example.com/docs/caf%C3%A9%20%281%29.jpg');
  assert.throws(() => publicURL('https://user:password@cdn.example.com', 'asset.jpg'));
  assert.throws(() => publicURL('https://cdn.example.com?token=value', 'asset.jpg'));
});

test('annotation rewriting preserves metadata and fixes old machine-specific paths', () => {
  const input = { highlights: [{ id: 'id-1', pageIndex: 3, thumbnail: '/old/machine/repo/assets/cover.jpg' }] };
  const result = rewriteJSON(input, 'assets/paper.pdf.zditor-pdf-annotation.json', assets, '/repo');
  assert.deepEqual(result, { highlights: [{ id: 'id-1', pageIndex: 3, thumbnail: assets[0].url }] });
  assert.equal(input.highlights[0].thumbnail, '/old/machine/repo/assets/cover.jpg');
});

test('public verification detects missing, corrupted and incorrectly served objects', async () => {
  const body = Buffer.from('test asset');
  const server = createServer((req, res) => {
    res.writeHead(req.url === '/missing' ? 404 : 200, {
      'content-type': req.url === '/html' ? 'text/html' : 'image/jpeg',
    });
    res.end(req.url === '/corrupt' ? 'bad' : body);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const asset = { path: 'test.jpg', content_type: 'image/jpeg', size: body.length,
    sha256: createHash('sha256').update(body).digest('hex') };
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await verifyAsset({ ...asset, url: base + '/ok' });
    await assert.rejects(verifyAsset({ ...asset, url: base + '/missing' }), /HTTP 404/);
    await assert.rejects(verifyAsset({ ...asset, url: base + '/corrupt' }), /SHA-256 mismatch/);
    await assert.rejects(verifyAsset({ ...asset, url: base + '/html' }), /Content-Type/);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
