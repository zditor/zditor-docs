#!/usr/bin/env bash
set -euo pipefail
: "${GH_TOKEN:?}" "${GITHUB_REPOSITORY:?}" "${RELEASE_VERSION:?}" \
  "${R2_ACCOUNT_ID:?}" "${R2_BUCKET_NAME:?}" "${AWS_ACCESS_KEY_ID:?}" "${AWS_SECRET_ACCESS_KEY:?}"
export AWS_DEFAULT_REGION=auto AWS_EC2_METADATA_DISABLED=true AWS_RETRY_MODE=standard AWS_MAX_ATTEMPTS=5
export RELEASE_DOWNLOAD_BASE_URL=${RELEASE_DOWNLOAD_BASE_URL:-https://download.zditor.com}
script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
work=$(mktemp -d "${RUNNER_TEMP:-/tmp}/zditor-r2.XXXXXX")
trap 'rm -rf "$work"' EXIT
# Preserve the multipart fix from the existing release uploader: installers below
# 1 GiB use one PUT, while larger files use the classic transfer client.
export AWS_CONFIG_FILE="$work/aws-config"
cat > "$AWS_CONFIG_FILE" <<'CONFIG'
[default]
s3 =
    preferred_transfer_client = classic
    multipart_threshold = 1GB
CONFIG
upload() {
  local attempt
  for attempt in 1 2 3; do
    if aws s3 cp --no-progress --endpoint-url "$endpoint" "$@"; then return 0; fi
    if [[ "$attempt" == 3 ]]; then
      echo '::error::R2 upload failed after three attempts; updater publication stopped.' >&2
      return 1
    fi
    sleep "$((attempt * ${R2_UPLOAD_RETRY_DELAY:-5}))"
  done
}
export RELEASE_ASSETS_DIR="$work/assets"
mkdir "$RELEASE_ASSETS_DIR"
[[ "$RELEASE_VERSION" =~ ^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$ ]] || { echo 'Invalid release version'; exit 1; }
tag="zditor-v$RELEASE_VERSION"
endpoint="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
gh release view "$tag" --repo "$GITHUB_REPOSITORY" --json isDraft,assets > "$work/release.json"
node --input-type=module - "$work/release.json" <<'JS'
import fs from 'node:fs';
const release = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
if (release.isDraft || !release.assets.length) throw new Error('R2 requires a public release with assets');
for (const asset of release.assets) {
  if (!/^[\w.()+ -]+$/.test(asset.name) || asset.name.startsWith('.') || asset.size <= 0) throw new Error('Invalid release asset');
}
JS
# gh authenticates downloads; any missing asset fails the whole stage.
gh release download "$tag" --repo "$GITHUB_REPOSITORY" --dir "$RELEASE_ASSETS_DIR"
node --input-type=module - "$work/release.json" <<'JS'
import fs from 'node:fs';
import path from 'node:path';
for (const asset of JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).assets) {
  if (fs.statSync(path.join(process.env.RELEASE_ASSETS_DIR, asset.name)).size !== asset.size) throw new Error(`Incomplete download: ${asset.name}`);
}
JS
if [[ "${PROMOTE_LATEST:-false}" == true ]]; then
  node "$script_dir/release-core.mjs" rewrite-updater
  # Refuse to move the updater backwards. Only a real 404 means no current pointer.
  if aws s3api head-object --endpoint-url "$endpoint" --bucket "$R2_BUCKET_NAME" --key latest.json > /dev/null 2> "$work/head.err"; then
    aws s3 cp --endpoint-url "$endpoint" "s3://$R2_BUCKET_NAME/latest.json" "$work/current.json"
    node "$script_dir/release-core.mjs" check-updater "$work/current.json"
  elif ! grep -Eq '\(404\)|\(NoSuchKey\)|\(NotFound\)' "$work/head.err"; then
    cat "$work/head.err" >&2
    exit 1
  fi
fi
# The versioned payload is complete before any updater pointer becomes visible.
for file in "$RELEASE_ASSETS_DIR"/*; do
  [[ "$(basename "$file")" != latest.json ]] || continue
  upload "$file" "s3://$R2_BUCKET_NAME/$tag/$(basename "$file")"
done
if [[ "${PROMOTE_LATEST:-false}" == true ]]; then
  upload "$RELEASE_ASSETS_DIR/latest.json" "s3://$R2_BUCKET_NAME/$tag/latest.json" \
    --content-type application/json --cache-control 'no-cache'
  upload "$RELEASE_ASSETS_DIR/latest.json" "s3://$R2_BUCKET_NAME/latest.json" \
    --content-type application/json --cache-control 'no-cache'
  if [[ -n "${CLOUDFLARE_ZONE_ID:-}" || -n "${CLOUDFLARE_API_TOKEN:-}" ]]; then
    : "${CLOUDFLARE_ZONE_ID:?}" "${CLOUDFLARE_API_TOKEN:?}"
    export PURGE_URL="${RELEASE_DOWNLOAD_BASE_URL%/}/latest.json"
    node -e 'process.stdout.write(JSON.stringify({files:[process.env.PURGE_URL]}))' > "$work/purge.json"
    curl -fLsS --request POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
      -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H 'Content-Type: application/json' \
      --data-binary "@$work/purge.json" --output "$work/purge-result.json"
    node -e 'if(!JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).success) throw Error("Cloudflare cache purge failed")' "$work/purge-result.json"
  fi
fi
printf '\nR2 upload complete: %s/%s/ (updater promoted: %s)\n' "$RELEASE_DOWNLOAD_BASE_URL" "$tag" "${PROMOTE_LATEST:-false}" >> "$GITHUB_STEP_SUMMARY"
