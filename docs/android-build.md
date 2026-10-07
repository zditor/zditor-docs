# Android 构建产物

`.github/workflows/build_android.yml` 是独立的 Android 工作流，只保存 Actions artifacts。
它不上传 GitHub Release 或 Google Play，不由 tag 自动触发，也不修改桌面构建工作流。

## 运行方式

打开 **Actions → Build Android → Run workflow**，设置：

| 输入 | 说明 |
| --- | --- |
| `source_ref` | 应用仓库的分支、标签或提交 SHA。留空使用变量 `ZDITOR_REF`，未配置时使用 `main`；构建最新 Android 源码可填 `1003-exc` |
| `version` | 可选的 Android 版本号，格式为 `主版本.次版本.修订号`，例如 `1.9.9`。填写后只覆盖本次检出的 `package.json`、锁文件和 `tauri.conf.json`，并据此生成 Android `versionName`/`versionCode`；留空沿用源码版本 |
| `android_target` | 选择 `aarch64`（默认）、`armv7`、`i686` 或 `x86_64` |
| `build_mode` | `release`（默认）或 `debug`，两者均生成 APK 和 AAB；安装测试请选择 `debug` |

`aarch64` 用于 ARM64，`armv7` 用于 32 位 ARM，`i686` 和 `x86_64` 用于对应的 x86 设备或模拟器。
每次只构建所选的一个 ABI。产物路径或文件名中的 `universal` 是未按 ABI 拆包的 Gradle variant 名称，
不代表包含所有架构；例如 `aarch64` 产物只包含 ARM64。

所选源码必须包含 `android:build` 脚本及已有 Android 项目。若填写 `version`，工作流会先检查源码中的
`src-tauri/tauri.conf.json` 与 `package.json` 版本一致，再将两处版本临时改为输入值；未填写时沿用源码版本。
Tauri 会用该版本生成 Android `versionName`，并按 `主版本 × 1,000,000 + 次版本 × 1,000 + 修订号`
生成 `versionCode`。次版本和修订号须不大于 999，生成的 `versionCode` 须在 Android 允许范围内。

当前应用 Gradle 没有 release `signingConfig`，因此 release APK/AAB **未签名**，不能直接安装或发布。
`debug` 使用 Android 自动生成的 debug key 签名，适合安装测试；正式分发需要另行配置 release 签名。
参见 [Tauri Android 签名](https://v2.tauri.app/distribute/sign/android/)。

## 下载与核对

构建成功后，在该次运行的 **Artifacts** 下载：

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

## 源码与依赖配置

复用仓库 **Settings → Secrets and variables → Actions** 中的配置：

| 类型 | 名称 | 用途 |
| --- | --- | --- |
| Secret | `REPO` | 应用仓库，格式 `owner/name` |
| Secret | `DEPLOY_TOKEN` | 检出应用与依赖仓库所需的只读令牌 |
| Secret | `EXCALIDRAW_REPO` | Excalidraw 依赖仓库 |
| Variable | `ZDITOR_REF` | `source_ref` 留空时的应用源码 ref，未设置则 `main` |
| Variable | `EXCALIDRAW_REF` | 应用未固定 Excalidraw ref 时的回退值 |
| Variable | `TAURI_CEF_REPO` | Tauri 仓库，默认 `zizdlp/tauri-cef` |
| Variable | `TAURI_CEF_REF` | 应用未固定 Tauri ref 时的回退值 |

依赖优先读取所选应用源码中的 `tauri-cef.ref` 和 `zditor-excalidraw.ref`，随后回退到上述变量及
现有桌面工作流的默认值：`zizdlp/tauri-cef` 使用 `main`，Excalidraw 使用其默认分支。
默认 Tauri 仓库若解析到旧值 `tauri-cef-v3.0.0-alpha.10`，也回退到 `main`；自定义 Tauri 仓库在未提供
ref 时使用 `tauri-cef-v3.0.0-alpha.10`。
应用检出到 `zditor/`，Tauri 与 Excalidraw 分别检出为同级的 `tauri/` 和 `zditor-excalidraw/`，
以满足应用的本地依赖路径。Android 使用 Tauri 的 Android 构建，不生成桌面 CEF 产物。

## 构建环境

工作流使用 Ubuntu 22.04、Node 22、JDK 17、Android SDK 36、Build Tools 36.0.0、
NDK 27.2.12479018 和 Rust stable。

构建参数参见 [Tauri CLI：android build](https://v2.tauri.app/reference/cli/#android-build)。
