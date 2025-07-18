# AI 功能使用指南

## 大纲

- [模型获取](#模型获取)
  - [本地模型](#本地模型部署与集成)
  - [云端模型](#云端-api-模型集成)
- [模型配置](#模型配置)
- [AI 功能](#功能)
- [后续计划](#后续)

## 模型获取

`zditor` 设计了一套灵活的模型配置系统，允许用户调用兼容 OpenAI SDK 接口的各类大型语言模型（LLMs），无论是部署在本地的私有模型，还是通过 API 访问的云端服务。这种兼容性极大地扩展了`zditor`的 AI 能力边界，确保用户可以根据自身需求（如数据隐私、成本控制、模型性能等）选择最合适的 AI 后端。

### 本地模型部署与集成

用户可以在自己的计算机上运行大型语言模型，通过`zditor`直接调用。这通常涉及到安装特定的本地 AI 运行环境，如 Ollama，并在`zditor`中指定其服务地址。本地模型的优势在于数据不出本地、无 API 调用费用、网络依赖性低，尤其适合处理敏感信息或离线工作场景。

![qwen3](../assets/qwen.png)

- 前往[ollma 官网](https://www.ollama.com/)下载 ollama
- 下载模型,比如下载千问 3:`ollama run qwen3:8b`
- 查看模型列表: `ollama list`

![ollama 演示](../assets/ollama.gif)

### 云端 API 模型集成

用户可以通过互联网访问由各大 AI 厂商提供的模型服务。`zditor`支持配置这些服务的 API 密钥和接口地址，实现与云端模型的无缝对接。云端模型的优势在于无需本地高性能硬件、模型更新及时、易于扩展，但需要考虑数据传输和 API 调用成本。

以轨迹流动为例：

- 前往[硅基流动官网](https://cloud.siliconflow.cn/)注册并登陆
- 前往模型广场选择模型，复制模型名称
- 前往 API 密钥创建并复制密钥

![硅基流动API演示](../assets/siliconflow.gif)

## 模型配置

无论您选择哪个云端 AI 厂商（如 OpenAI、Anthropic、百度文心一言、阿里云通义千问等），`zditor`的 API 模型配置流程都大同小异，因为它遵循 OpenAI SDK 的兼容性设计。

- 打开 zditor，进入设置，选择模型组右侧的添加按钮
- 设置分组名称（自定义即可，不能重复），设置基础 URL，Ollama 的模型 URL 已经默认设置，硅基流动参考[官方文档](https://docs.siliconflow.cn/cn/faqs/stream-mode)，目前是`https://api.siliconflow.cn/v1`
- 设置 api 密钥，这里是上面步骤复制的，ollama 的可以不填
- 设置模型，以英文逗号分隔，这里是上面步骤复制的模型名称
- 设置 topp,温度等参数，这里可以默认，为了更好效果可以参考对应模型等官方文档

![配置模型](../assets/config_model.gif)

在设置页面选择模型，打开一个新标签页输入提问测试,下图以 ollama 下载的 qwen3 为例，先进入设置选中对应模型，然后在标签页输入提问，可以看到模型以流式输出回答。

![测试模型](../assets/model_test.gif)

## 功能

Zditor 支持 ai 划词和多轮对话两种形式，打开 markdown 文档，选中一段文本会弹出文本工具栏，选中图片，会弹出图片工具栏，目前有 5 种工具栏。工具栏上有自定义的提示词下拉列表，有自定义的提示词 icon 组件。

![AI功能](../assets/ai_tool.gif)

### 多轮对话

打开一个新标签，默认是多轮对话模式，在模型执行期间，==标签上会闪烁一个绿色的圆==，表示模型正在执行，即使切换到其他标签，任务也会执行。

![多轮对话示意图](assets/多轮对话.gif)

### AI excalidraw手绘

目前一些先进模型可以直接根据提示词获得比较好的手绘效果，参考下图，可以在多轮对话直接预览生成效果，也可以复制到excalidraw中编辑

![手绘示意图](assets/excalidraw.gif)

### 多模态

支持多模态输入，除了多轮对话这里可以输入图片附件之外，图片工具栏也支持图像相关输入

![多模态图片输入问答示意图](assets/截屏2025-07-13_14.37.22.png)

左侧导航栏选中插件，可以添加删除 ai 下拉列表中的提示词，也可以添加删除 ai 工具栏中的快捷提示词按钮。

![Agent修改文档](assets/截屏2025-07-13_11.42.09.png)

### 文章排版

选中恰当的模型，然后将需要修改的 markdown 文档的标签拖拽到输入框（这个操作会触发 agent workflow，进而实现在原文修改文档），然后输入问题。

![排版](../assets/排版.gif)

### 文章修订

选中恰当的模型，然后将需要修改的 markdown 文档的标签拖拽到输入框（这个操作会触发 agent workflow，进而实现在原文修改文档），然后输入问题。这里还没有完全完成，后续会修改工作流，改成一段段处理修订，然后校验（ai 修订的不一定对，也可能修改了原文），校验成功才继续下一段，多次重试。适合修订的场景：公众号文章错别字、作文等文字工作的场景。

![修订](../assets/修订.gif)

## 后续

后续将首先完善工作流相关部分，实现用户局部修订文章需求（比如修订第二段、修订总结段），ai修改文章有时会导致错误修改，比如本来是对的，但是ai改错了，但是用户未必能看出来，这时原文修改严格要求不能改动原文就是很有必要的。目前是对比原文，发现不对会提示用户，后续则是改成分段修订，当建议发现不对，就重新修订。

后续会修改excalidraw的相关代码，实现excalidraw白板的ai功能，应该也会类似添加agent工作流，实现诸如转换成思维导图、对齐、ai来添加手绘元素等功能。

[手绘苹果.excalidraw](assets/手绘苹果.excalidraw)


