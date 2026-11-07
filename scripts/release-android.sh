#!/usr/bin/env bash
# Run from the Actions workspace, after release.yml collects android-artifacts.
set -euo pipefail
: "${GH_TOKEN:?}" "${ANDROID_KEYSTORE_BASE64:?}" "${ANDROID_KEYSTORE_PASSWORD:?}" \
  "${RELEASE_VERSION:?}" \
  "${RELEASE_TARGET:?}" "${RELEASE_REPOSITORY:?}"
# Alias is ordinary configuration. Most keystores use the same store/key password;
# retain explicit overrides for existing keys with a different alias or password.
export ANDROID_KEY_ALIAS="${ANDROID_KEY_ALIAS:-upload}"
export ANDROID_KEY_PASSWORD="${ANDROID_KEY_PASSWORD:-$ANDROID_KEYSTORE_PASSWORD}"
[[ "${BUILD_MODE:-release}" == release ]] || { echo 'Only release builds may be published'; exit 1; }
[[ "$RELEASE_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || exit 1
[[ "$RELEASE_TARGET" =~ ^(aarch64|armv7|i686|x86_64)$ ]] || exit 1
tag="zditor-v$RELEASE_VERSION"
[[ "$(gh release view "$tag" --repo "$RELEASE_REPOSITORY" --json isDraft --jq .isDraft)" == true ]] || { echo 'Only a prepared draft can accept build assets'; exit 1; }
umask 077
signing_dir=$(mktemp -d "${RUNNER_TEMP:-/tmp}/zditor-android-sign.XXXXXX")
trap 'rm -rf "$signing_dir"' EXIT
printf '%s' "$ANDROID_KEYSTORE_BASE64" | base64 --decode > "$signing_dir/release.jks"
build_tools=$(find "${ANDROID_HOME:?}/build-tools" -mindepth 1 -maxdepth 1 -type d | sort -V | tail -1)
test -x "$build_tools/apksigner" && test -x "$build_tools/zipalign"
# The selected architecture should produce exactly one release APK and one AAB.
apk_count=$(find android-artifacts/apk -name '*.apk' -type f | wc -l | tr -d ' ')
aab_count=$(find android-artifacts/bundle -name '*.aab' -type f | wc -l | tr -d ' ')
[[ "$apk_count" == 1 && "$aab_count" == 1 ]] || { echo 'Expected exactly one APK and AAB for the selected Android target'; exit 1; }
apk=$(find android-artifacts/apk -name '*.apk' -type f)
aab=$(find android-artifacts/bundle -name '*.aab' -type f)
output_dir="$(pwd)/android-signed"
mkdir -p "$output_dir"
prefix="Zditor_${RELEASE_VERSION}_android_${RELEASE_TARGET}"
"$build_tools/zipalign" -P 16 -f 4 "$apk" "$signing_dir/aligned.apk"
"$build_tools/apksigner" sign --ks "$signing_dir/release.jks" --ks-key-alias "$ANDROID_KEY_ALIAS" \
  --ks-pass env:ANDROID_KEYSTORE_PASSWORD --key-pass env:ANDROID_KEY_PASSWORD \
  --out "$output_dir/$prefix.apk" "$signing_dir/aligned.apk"
"$build_tools/apksigner" verify --verbose "$output_dir/$prefix.apk"
"$build_tools/zipalign" -c -P 16 4 "$output_dir/$prefix.apk"
jarsigner -keystore "$signing_dir/release.jks" -storepass:env ANDROID_KEYSTORE_PASSWORD \
  -keypass:env ANDROID_KEY_PASSWORD -signedjar "$output_dir/$prefix.aab" "$aab" "$ANDROID_KEY_ALIAS"
# Trust the configured signing key (Android distribution keys are often self-signed).
jarsigner -verify -strict -keystore "$signing_dir/release.jks" -storepass:env ANDROID_KEYSTORE_PASSWORD \
  "$output_dir/$prefix.aab" "$ANDROID_KEY_ALIAS"
export ANDROID_RELEASE_PREFIX="$prefix" ANDROID_RELEASE_OUTPUT="$output_dir"
node <<'JS'
const fs = require('node:fs');
const prefix = process.env.ANDROID_RELEASE_PREFIX;
const info = JSON.parse(fs.readFileSync('android-artifacts/build-info.json', 'utf8'));
info.files = [`${prefix}.apk`, `${prefix}.aab`];
info.signing = 'release';
fs.writeFileSync(`${process.env.ANDROID_RELEASE_OUTPUT}/${prefix}.build-info.json`, JSON.stringify(info, null, 2) + '\n');
JS
(
  cd "$output_dir"
  sha256sum "$prefix.apk" "$prefix.aab" "$prefix.build-info.json" > "$prefix.SHA256SUMS"
)
# Explicit file list excludes apksigner's .idsig sidecar and all private material.
gh release upload "$tag" --repo "$RELEASE_REPOSITORY" --clobber \
  "$output_dir/$prefix.apk" "$output_dir/$prefix.aab" \
  "$output_dir/$prefix.build-info.json" "$output_dir/$prefix.SHA256SUMS"
printf '\nSigned Android APK/AAB uploaded to draft `%s`; the parent workflow publishes after all selected builds pass.\n' "$tag" >> "$GITHUB_STEP_SUMMARY"
