# 统一构建与发布

所有应用平台共用 **Actions → Release Zditor → Run workflow** 一个入口：
`.github/workflows/release.yml`。桌面、iOS、Android 和 R2 工作流只作为内部可复用任务调用，
不再分别手动启动。旧的重复桌面开发构建已合并；推送 `v*` 标签也不再单独触发桌面构建。
文档媒体迁移用的 `Upload documentation assets to R2` 仍独立，它使用不同的 bucket 和清单。

## 使用方式

| 输入 | 默认值 | 用途 |
| --- | --- | --- |
| `source_ref` | `main` | 应用仓库的分支、标签或完整提交；预检后固定为同一个 SHA |
| `version` | 留空 | 沿用源码版本；填写时必须与 `package.json`、`tauri.conf.json` 一致 |
| `desktop` | 开 | macOS ARM64/Intel、Windows、Linux，分别构建 Wry 与 CEF，共 8 个任务 |
| `ios` | 开 | 签名归档并校验 iOS；发布时上传 TestFlight |
| `android` | 开 | 构建所选架构的 APK 和 AAB |
| `android_target` | `aarch64` | 也支持 `armv7`、`i686`、`x86_64`，每次一个 ABI |
| `android_mode` | `release` | `debug` 可安装测试；正式发布要求 `release` |
| `publish` | 关 | 开启后上传 TestFlight、签名 Android，并在所选任务全部成功后公开 GitHub Release |
| `cloudflare` | 关 | 发布成功后同步 Release 安装包至现有 R2 下载 bucket；必须同时开启 `publish` |
| `what_to_test` | 留空 | TestFlight 简体中文测试说明 |

建议先关闭 `publish` / `cloudflare` 跑一次构建：桌面产物保存在 GitHub **草稿** Release，
Android 保存未签名的 Actions artifacts，iOS 完成签名归档与 IPA 内容校验但不上传。
构建模式仍需要各平台签名/校验凭据，且桌面暂存草稿需要 `RELEASE_TOKEN`。

正式发布时，选择需要的平台，开启 `publish` 和 `cloudflare`（仅发布 iOS 时关闭 `cloudflare`）。
三端使用源码中的同一个版本，先在应用仓库更新版本、changelog 并合并，再运行此入口。
桌面/Android 统一使用 `zditor-vVERSION` Release 标签。iOS 的构建号由 run number / attempt 自动生成，
内部测试组从 `TESTFLIGHT_INTERNAL_GROUP_IDS` 读取。iOS 不提交 App Store 正式审核；Android 渠道是 GitHub Release＋R2。

## 流程与失败恢复

1. **预检**：检查平台选择、版本、Android/R2 必需凭据，锁定应用 SHA；检查 Tauri 与 Excalidraw 为完整提交，
   iOS 依赖清单必须与另外两端一致。按应用 changelog 生成 Release 说明并记录来源及平台选择。
2. **平台任务**：并行运行 8 项桌面构建、iOS 构建/上传、Android 构建/签名。桌面与已签名 Android 文件先上传草稿。
3. **公开 Release**：所有所选任务成功后，汇总各桌面目标独立保存的 updater 元数据，检查 4 个目标的签名和安装包及 Android 签名产物齐全，再将草稿转为正式 Release。Android 单独发布不会改变 GitHub 的桌面 latest 标记。
4. **R2**：认证下载并核对所有 Release 文件，安装包全部上传成功后才写版本目录及根目录 `latest.json`。
   更新器 URL 必须指向当前 Release 中实际存在、带签名的文件；拒绝将 R2 更新器降级。
   Android 单独发布只上传版本目录，不修改桌面更新器。
   保留原有 R2 multipart 修复：1 GiB 以下单次 PUT、classic 传输客户端、请求重试及整文件重试。
5. **汇总**：Actions summary 显示锁定的源码、版本和各阶段结果。

运行失败可使用 GitHub 的 **Re-run failed jobs**，保留原运行的输入与成功任务。
也可以使用同一源码 SHA、版本与平台选择重新运行整个流程：只复用相同来源/平台的草稿，拒绝往已公开 Release 覆盖构建。
已有旧流程草稿没有来源标记时会被拒绝，需要先手动确认并删除过时草稿，或使用新版本。

iOS 上传是独立的外部操作：如果 iOS 已成功而其他平台失败，TestFlight 构建会保留；草稿与 R2 不会提前发布。
重新运行**全部**任务会生成新的 iOS 构建号。优先只重跑失败任务。

若 GitHub Release 已公开，只有 R2 阶段失败，可只重跑失败任务；也可在相同入口中：
取消所有平台、开启 `publish` 与 `cloudflare`，填写该 Release 的版本和原应用 SHA。
此时只同步已公开的 Release，根据来源记录决定是否更新桌面 updater，不重新构建或重新上传 TestFlight。

发布运行共用一个 concurrency group，不取消正在运行的发布；GitHub concurrency 最多保留一个 pending 运行，
请等待前一次结束后再发起下一次发布，避免连续提交导致旧的 pending 运行被替换。

## 凭据与配置

沿用现有仓库配置，不读取或提交真实密钥：

| 范围 | Secrets / Variables |
| --- | --- |
| 源码与依赖 | `REPO`、`DEPLOY_TOKEN`、`EXCALIDRAW_REPO`；变量 `TAURI_CEF_REPO`（默认 `zizdlp/tauri-cef`） |
| GitHub Release | `RELEASE_TOKEN`：对本仓库 Release 的写权限 |
| 桌面更新器签名 | `TAURI_SIGNING_PRIVATE_KEY`、`TAURI_SIGNING_PRIVATE_KEY_PASSWORD` |
| macOS 签名/公证 | 现有 `APPLE_CERTIFICATE`、`APPLE_CERTIFICATE_PASSWORD`、`APPLE_KEYCHAIN_PASSWORD`、`APPLE_SIGNING_IDENTITY`、`APPLE_ID`、`APPLE_ID_PASSWORD`、`APPLE_TEAM_ID`、Apple API 配置 |
| iOS | `APPLE_TEAM_ID`、`APPLE_API_KEY`、`APPLE_API_ISSUER`、`APPLE_API_KEY_P8`；变量 `IOS_BUNDLE_ID`、`IOS_USES_NON_EXEMPT_ENCRYPTION`、`TESTFLIGHT_INTERNAL_GROUP_IDS` |
| Android 正式签名（新增） | `ANDROID_KEYSTORE_BASE64`、`ANDROID_KEYSTORE_PASSWORD`、`ANDROID_KEY_ALIAS`、`ANDROID_KEY_PASSWORD` |
| R2 下载 bucket | `R2_ACCOUNT_ID`、`R2_BUCKET_NAME`、`R2_ACCESS_KEY_ID`、`R2_SECRET_ACCESS_KEY` |
| CDN 清缓存（可选，成对配置） | `CLOUDFLARE_ZONE_ID`、`CLOUDFLARE_API_TOKEN` |
| 下载域名（可选变量） | `RELEASE_DOWNLOAD_BASE_URL`，默认 `https://download.zditor.com`，必须是 HTTPS origin |

Android keystore 的 base64 内容应在本机生成并保存为 Actions secret；使用现有发布签名密钥，
保持后续版本可覆盖安装。签名步骤先 zipalign，再 apksigner；AAB 使用 jarsigner，校验失败不会上传。
密钥只在临时目录解码并自动删除，密码通过环境参数传递。

iOS 仍只保存 JSON 发布结果，不在公开仓库上传 IPA、证书或 dSYM。更多配置见
[iOS 文档](ios-testflight.md) 和 [Android 文档](android-build.md)。R2 仍使用应用下载 bucket，
不与 [文档资源 bucket](r2-assets.md) 混用。Cloudflare 清缓存只清理 `latest.json`，不全站清缓存；
未配置清缓存凭据时，旧缓存最多持续原有 TTL，请在域名上让 `latest.json` 遵循源站 `no-cache`。

## 本地校验

```sh
node --test scripts/release-core.test.mjs
bash -n scripts/release-android.sh scripts/release-r2.sh
actionlint -shellcheck= .github/workflows/*.yml
```

本地测试模拟 GitHub/R2 CLI，不触发真实构建、上传或发布。
