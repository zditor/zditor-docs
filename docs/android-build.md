# Android 构建产物

`.github/workflows/build_android.yml` 由 [统一发布入口](unified-release.md) 调用。
默认只保存未签名 release APK/AAB 的 Actions artifacts；开启 `publish` 后使用正式 keystore
签名并上传草稿 Release，全部所选平台成功后公开，也可自动同步到 Cloudflare R2。

## 运行方式

打开 **Actions → Release Zditor → Run workflow**，选择 `android`；按需取消另外两个平台。
`source_ref` 指定应用源码，`version` 可留空，填写时必须与源码版本一致，
`android_target` 选择 `aarch64`、`armv7`、`i686` 或 `x86_64`。
`android_mode` 默认 `release`，也可选 `debug`（使用 debug key，可安装测试）。
开启 `publish` 时必须选择 `release`，才会使用正式密钥签名并分发；`cloudflare` 控制随后同步 R2。

`aarch64` 用于 ARM64，`armv7` 用于 32 位 ARM，`i686` 和 `x86_64` 用于对应的 x86 设备或模拟器。
每次只构建所选的一个 ABI。产物路径或文件名中的 `universal` 是未按 ABI 拆包的 Gradle variant 名称，
不代表包含所有架构；例如 `aarch64` 产物只包含 ARM64。

所选源码必须包含 `android:build` 脚本及已有 Android 项目。统一入口先核对版本并固定源码提交，
不允许只修改 Android 的版本。Tauri 按 `主版本 × 1,000,000 + 次版本 × 1,000 + 修订号`
生成 `versionCode`，次版本和修订号须不大于 999，生成值须在 Android 允许范围内。

应用 Gradle 没有 release `signingConfig`，构建产物仍是未签名 APK/AAB。
发布任务从 `ANDROID_KEYSTORE_BASE64`、`ANDROID_KEYSTORE_PASSWORD`、`ANDROID_KEY_ALIAS`、
`ANDROID_KEY_PASSWORD` 读取正式签名配置。APK 先 zipalign，再签名并校验；AAB 用 jarsigner 签名并校验。
仅已签名文件与对应的构建信息、校验和上传到 Release，校验失败会阻止发布。

## 下载与核对

构建成功后，在该次运行的 **Artifacts** 下载原始构建（release 未签名，debug 使用 debug key）：

```text
zditor-android-VERSION-TARGET-MODE-SHORTSHA
```

产物保存 **14 天**。短 SHA 是应用提交的前 12 位；解压后的目录结构为：

```text
apk/.../*.apk
bundle/.../*.aab
build-info.json
SHA256SUMS
```

`build-info.json` 记录应用版本、Android `versionName`/`versionCode`、完整提交、目标、模式、NDK 版本及两项依赖的实际提交。
`SHA256SUMS` 覆盖所有 APK、AAB 和 `build-info.json`，路径相对于解压根目录；在该目录可运行
`sha256sum -c SHA256SUMS` 核对。

正式发布的文件位于 GitHub Release `zditor-vVERSION`，名称为
`Zditor_VERSION_android_TARGET.apk` / `.aab`，并带独立 `.build-info.json` 和 `.SHA256SUMS`。
Release 校验和覆盖签名后的文件；Actions artifact 中的校验和覆盖原始构建文件，二者用途不同。

## 源码与依赖配置

复用仓库 **Settings → Secrets and variables → Actions** 中的配置：

| 类型 | 名称 | 用途 |
| --- | --- | --- |
| Secret | `REPO` | 应用仓库，格式 `owner/name` |
| Secret | `DEPLOY_TOKEN` | 检出应用与依赖仓库所需的只读令牌 |
| Secret | `EXCALIDRAW_REPO` | Excalidraw 依赖仓库 |
| Variable | `EXCALIDRAW_REF` | 应用未固定 Excalidraw ref 时的回退值 |
| Variable | `TAURI_CEF_REPO` | Tauri 仓库，默认 `zizdlp/tauri-cef` |
| Variable | `TAURI_CEF_REF` | 应用未固定 Tauri ref 时的回退值 |

统一入口要求应用源码的 `tauri-cef.ref`、`zditor-excalidraw.ref` 固定为完整提交；
若同时选择 iOS，还会核对 iOS 依赖清单与这里的仓库及提交一致。
底层构建器仍保留变量回退，以便其他可复用调用方使用。
应用检出到 `zditor/`，Tauri 与 Excalidraw 分别检出为同级的 `tauri/` 和 `zditor-excalidraw/`，
以满足应用的本地依赖路径。Android 使用 Tauri 的 Android 构建，不生成桌面 CEF 产物。

## 构建环境

工作流使用 Ubuntu 22.04、Node 22、JDK 17、Android SDK 36、Build Tools 36.0.0、
NDK 27.2.12479018 和 Rust stable。

构建参数参见 [Tauri CLI：android build](https://v2.tauri.app/reference/cli/#android-build)。
