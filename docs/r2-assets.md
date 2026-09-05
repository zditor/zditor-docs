# Documentation assets on R2

Media from the original Git LFS snapshot is hosted in the dedicated
`zditor-docs-assets` Cloudflare R2 bucket, under the `v1/` prefix, and served at
`https://docs-assets.zditor.com`. The existing `zditor`, `zditor-docs` and other
buckets serve separate workloads.

`assets/r2-manifest.json` records each original path, object key, public URL,
content type, size and SHA-256 hash. It includes the PDF annotation sidecar and
its thumbnails. Audio and video URLs preserve Zditor playback options.

Zditor's current PDF card toolbar resolves highlights through its local file
index. The four Transformer articles therefore display each remote excerpt as
a PDF page link plus its annotation thumbnail. The original annotation JSON
and highlight IDs remain available alongside the PDF for compatible clients.
The skill reference retains local PDF card syntax examples.

## Migration and recovery

The migration needs Node.js 24, Git LFS for the original snapshot, and AWS CLI
for S3 uploads. It runs from the repository root:

```sh
node scripts/r2-assets.mjs plan
node scripts/r2-assets.mjs migrate
node scripts/r2-assets.mjs upload
node scripts/r2-assets.mjs migrate --apply
```

`plan` records the current LFS snapshot and validates every local file.
`migrate` without `--apply` only reports the planned changes. Applying the
migration first downloads and verifies every public object, then rewrites
document references, removes LFS attributes and untracks the local media.
Original local files stay on disk and are ignored by Git. Historical commits
and their LFS objects are retained. This does not reclaim historical LFS
storage or rewrite other branches.

For local uploads, configure AWS credentials locally with an AWS profile, or
set `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` in the process environment.
Also set `R2_BUCKET_NAME=zditor-docs-assets` and either `R2_ACCOUNT_ID` or
`R2_ENDPOINT_URL`. Do not commit credentials. The script does not load `.env`.

The `Upload documentation assets to R2` GitHub workflow uses the existing R2
repository secrets. It checks out the original commit pinned in the manifest,
downloads its LFS objects, uploads only manifest entries, and verifies their
public contents. It can restore missing objects after the migration. Repeated
uploads skip matching objects and reject conflicting existing objects.

```sh
node scripts/r2-assets.mjs upload --source-root /path/to/original/checkout
node scripts/r2-assets.mjs verify
node --test scripts/r2-assets.test.mjs
```

## Hosting configuration

Connect `docs-assets.zditor.com` as the bucket's custom domain. The S3 API
endpoint is for authenticated uploads and must not be used in document links.
The `r2.dev` development URL is unnecessary with a custom domain.

For these public assets, allow CORS `GET` and `HEAD` from `*`, allow the `Range`
header, and expose `Content-Length`, `Content-Range`, `Accept-Ranges` and `ETag`.
This lets web and desktop clients fetch PDFs, annotations and media ranges.
Objects use their correct MIME type and `Cache-Control: public, max-age=86400`.

See Cloudflare's [S3 CLI guide](https://developers.cloudflare.com/r2/examples/aws/aws-cli/),
[public bucket guide](https://developers.cloudflare.com/r2/buckets/public-buckets/)
and [CORS guide](https://developers.cloudflare.com/r2/buckets/cors/).

## Adding media

Upload new media to this bucket with a new object key, set the correct content
type, verify its public URL, and use that absolute URL in the document. Preserve
the directory layout for PDF sidecars. Do not add new media binaries or LFS
pointers to Git. Version filenames when replacing published content so cached
URLs continue to identify the same content.
