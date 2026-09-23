# iOS TestFlight 发布

`.github/workflows/testflight.yml` 把私有应用仓库的 iOS 构建发布到 App Store Connect 的
TestFlight。工作流在 zditor-docs 中触发，源码来自应用仓库：配置预检 → 前端/原生依赖构建 →
App Store 签名归档 → IPA 内容校验 → Apple 上传校验 → 上传 → 等待处理 → 测试说明及内部测试组分发。
不会提交 App Store 正式审核或自动邀请测试员。

## 运行方式

在 **Actions → Publish TestFlight → Run workflow** 输入：

- `source_ref`：应用仓库中包含完整 iOS 实现及发布脚本的分支、标签或提交，默认 `main`。
- `version`：三段正式版本号，例如 `1.9.0`。
- `build_number`：可留空，自动将 run number/attempt 编码为 Apple 允许的三段构建号。首次手动覆盖后，后续构建号需要继续递增。
- `what_to_test`：可选，简体中文测试说明。
- `internal_group_ids`：可选，覆盖仓库变量。只接受当前应用的内部组。

工作流使用 macOS 26 / Xcode 26 SDK、Node 22、Rust 1.97.0、Go 1.25.5。应用仓库被检出到
`zditor/`，并按应用仓库中 `scripts/testflight/dependencies.json` 固定的提交，把 Tauri 与
Excalidraw 检出为同级的 `../tauri` 与 `../zditor-excalidraw`。这个布局是必需的：应用仓库的
`src-tauri/Cargo.toml` 以 `../../tauri` 引用 Tauri，前端以 `file:../zditor-excalidraw` 引用
Excalidraw。

上传由 `npm run testflight -- release` 一次完成：构建并签名后先调用 Apple
`altool --validate-app`，再调用 `altool --upload-app` 直接推送到 App Store Connect，随后轮询构建
处理状态，最后写入测试说明并关联内部测试组。处理等待最多 45 分钟，Apple 返回 INVALID/FAILED 或
构建过期等状态会使流程失败。若构建已经处理完成、仅待出口合规，流程记录“已上传，待合规”，不会将其
标记为可测试或关联测试组。

成功结果在 Actions summary 中包含 TestFlight 构建链接。

## 凭据与产物可见性

zditor-docs 是公开仓库，因此只提交工作流本身：仓库里没有任何证书、描述文件或 API 密钥，全部通过
GitHub **Settings → Secrets and variables → Actions** 读取，日志中的 secret 值会被掩码，脚本也不会
把私钥内容写进日志或产物。当前流程甚至不保存分发证书：它使用 App Store Connect API 密钥让 Xcode
自动签名，脚本在调用 Xcode 前会从子进程环境中删除 `APP_STORE_CONNECT_PRIVATE_KEY_BASE64` 和
`DEPLOY_TOKEN`，避免构建日志打印出密钥。

artifact 只保留两个 JSON 结果，不上传 IPA 和 dSYM：签名的 IPA 内嵌分发描述文件，dSYM 含构建符号，
都不适合放在公开仓库的 artifact 中。需要二进制时在应用仓库本机执行 `release`/`build`，或从私有应用
仓库的运行中获取。

| 产物 | 内容 | 是否上传 |
| --- | --- | --- |
| `release.json` | `version`、`buildNumber`、`bundleId`、`teamId`、加密声明、内部测试组 ID、测试说明、IPA 的 SHA-256 | 是 |
| `testflight.json` | App Store Connect 的应用 ID、构建 ID、处理状态、内部测试状态、构建链接 | 是 |
| `zditor.ipa` | 已签名的 App Store 构建 | 否 |
| `dSYMs/**` | 构建符号 | 否 |

## 一次性配置

工作流只需要 zditor-docs 中已经存在、并与 `build_app.yml` 共用的凭据，不需要额外新建 API 密钥：

| 类型 | 名称 | 用途 |
| --- | --- | --- |
| Secret | `REPO` | 私有应用仓库，格式 `owner/name`。与 `build_app.yml` 共用 |
| Secret | `DEPLOY_TOKEN` | 检出应用仓库、Tauri 与 Excalidraw 的只读令牌。与 `build_app.yml` 共用 |
| Secret | `APPLE_TEAM_ID` | Developer Team ID |
| Secret | `APPLE_API_KEY` | App Store Connect API 密钥 ID（10 位大写字母数字） |
| Secret | `APPLE_API_ISSUER` | API Issuer ID（UUID 形式） |
| Secret | `APPLE_API_KEY_P8` | `.p8` 私钥的 PEM 内容 |
| Variable | `IOS_BUNDLE_ID` | 默认 `com.zditor.ai` |
| Variable | `IOS_USES_NON_EXEMPT_ENCRYPTION` | 可留空或填 `pending`：上传后在 App Store Connect 回答加密问卷；已有结论时填 `true` 或 `false` |
| Variable | `TESTFLIGHT_INTERNAL_GROUP_IDS` | 可选，逗号分隔的内部测试组 ID |

工作流把 `APPLE_API_KEY`、`APPLE_API_ISSUER` 传给发布脚本的 `APP_STORE_CONNECT_KEY_ID`、
`APP_STORE_CONNECT_ISSUER_ID`，并把 `APPLE_API_KEY_P8` 写入 runner 临时目录后通过
`APPLE_API_KEY_PATH` 交给脚本；脚本会再复制到自己的私有临时目录供 Xcode 使用，任务结束前删除。

[Tauri 自动签名](https://v2.tauri.app/distribute/sign/ios/)要求团队 API 密钥具备 Admin 权限，
供 Xcode 创建签名证书和描述文件。已有密钥通常不能再次下载，所以复用现有密钥比新建一把更省事。私钥
只放在本机安全位置或 GitHub Secret，不要提交到任何仓库；通过 stdin 设置可以避免打印到终端：

```sh
gh secret set APPLE_API_KEY_P8 --repo zditor/zditor-docs < /secure/path/AuthKey_KEYID.p8
```

如果希望密钥只用于上传、不能改动证书，需要把 iOS 构建改为手动签名，改为预置 Apple Distribution
证书与 App Store 描述文件（可用 `APPLE_CERTIFICATE`、`APPLE_CERTIFICATE_PASSWORD` secret 存放），
这样密钥角色可降到 App Manager。代价是证书需要按年更换、描述文件会过期，需人工维护。

## 本机执行

在应用仓库中准备固定版本的两个相邻仓库、Node/Rust/Go、Xcode 26+；安装依赖后设置环境变量。私钥文件
应仅本人可读。

```sh
export RELEASE_VERSION=1.9.0
export BUILD_NUMBER=1.1.1
export APPLE_TEAM_ID=YOUR_TEAM_ID
export APP_STORE_CONNECT_KEY_ID=YOUR_KEY_ID
export APP_STORE_CONNECT_ISSUER_ID=YOUR_ISSUER_ID
export APPLE_API_KEY_PATH=/secure/path/AuthKey_YOUR_KEY_ID.p8
# 可留空，上传后回答 Apple 加密问卷；已有结论时设为 true 或 false
# 可选：TESTFLIGHT_INTERNAL_GROUP_IDS、TESTFLIGHT_WHAT_TO_TEST
npm run testflight -- plan
npm run testflight -- preflight
npm run testflight -- release
```

## 动作对照

| 命令 | 行为 |
| --- | --- |
| `plan` | 本地校验参数，打印计划（加密结论未定显示 null），不访问 Apple |
| `preflight` | 核实应用、内部组、重复构建号和 API 访问 |
| `build` | 仅签名打包并校验 IPA，不上传 |
| `release` | 完整构建和上传流程 |
| `publish` | 校验已有 IPA/manifest/SHA-256 后上传，不重建 |
| `status` | 仅读取已上传构建状态，不修改测试说明或组 |
| `distribute` | 为已处理的构建补充测试说明、关联内部组，不重新上传 |

产物目录为 `build/testflight/<version>-<build_number>/`。构建号通过 `bundle.iOS.bundleVersion`
设置，避免 Tauri 的 `--build-number` 追加出第四段。临时签名配置和解码私钥会清除；原来的 debug 归档
和生成的 Xcode 配置会恢复。不要同时运行本机 debug 和 TestFlight 构建。

发布脚本与单元测试都位于应用仓库，因此本机命令仍在那里执行。工作流只负责检出与编排。

## 校验与恢复

在应用仓库中运行：

```sh
npm run test:testflight
python3 -m unittest discover -s scripts/testflight -p 'test_*.py'
```

IPA 校验会检查实际 Bundle ID、版本、构建号、iPhoneOS 平台、权限说明、加密声明和 App Store 描述
文件。本地上传前的单元测试使用模拟的 Apple 响应；实际签名/上传仍需有效账号和密钥，且应用必须已经在
App Store Connect 中存在。

- **重复构建号**：换用更高的构建号；已上传的版本用 `status` / `distribute` 继续。
- **Apple 处理超时或上传连接中断**：先使用原版本号和构建号运行 `status`，确认是否已经收到，勿立即重复上传。
- **缺少合规信息**：构建可以先上传并由 Apple 处理。在 App Store Connect 的 TestFlight 构建旁点击“管理”回答加密问卷；若 Apple 要求文稿，再提供对应文稿。完成后运行 `distribute`，不必重新上传。同一构建恢复操作应保留原 manifest 中的加密设置。
- **无签名描述文件/无权限**：核对 Team ID、Bundle ID 与 API 密钥角色；确认 Developer Program 协议有效。
- **恢复归档失败**：旧归档保留在对应产物目录的 `previous-native-build`，失败构建保存在 `failed-native-build-*`；检查错误后再手动恢复，不要删除这些备份。
- **外部测试**：本工作流不自动提交 Beta App Review；需要在 App Store Connect 完成测试信息、审核和外部组设置。应用仓库中的 TestFlight 外部审核工作流仍留在原处，并需要在那里配置相同的 App Store Connect 密钥。

参考：[Tauri App Store 上传](https://v2.tauri.app/distribute/app-store/)、[Apple TestFlight](https://developer.apple.com/testflight/)、
[Provide export compliance information for beta builds](https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-export-compliance-information-for-beta-builds/)。
