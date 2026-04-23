# Zditor Retrospective: Tech Choices, Pitfalls, Roadmap, and Commercialization

## 1. Introduction

[en_01_introduction.mp3](../assets/audio/zditor/en/en_01_introduction.mp3|mode=audio)

Hey everyone. After working on zditor for so long, I want to do a full retrospective — covering the product's backstory, the pitfalls we hit with our tech choices, where things stand today, the roadmap ahead, and our thoughts on monetization.

## 2. Motivation

[en_02_motivation.mp3](../assets/audio/zditor/en/en_02_motivation.mp3|mode=audio)

I used to take notes in Evernote, then tried pretty much every other platform out there. None of them really worked for me, and since migrating data was such a pain, I eventually just abandoned everything I'd stored on each platform. After that, I started keeping all my docs and notes in GitHub repos and editing locally with Typora or VSCode. Later, I needed to share some documents with others. After some research, I found that while many projects support syncing repos directly — like GitBook and Mintlify — they typically only offer either fully public or fully private options. More granular permissions are a paid feature. Some of my documents, like company-related ones, obviously can't be public, but some personal notes I'd be happy to share. So I built zbook: a multi-tenant markdown document platform where multiple users can view rendered markdown docs in a browser. zbook had no editing functionality, so I then built zditor — a local markdown editor.

## 3. Surveying Editor Software

[en_03_editor_software.mp3](../assets/audio/zditor/en/en_03_editor_software.mp3|mode=audio)

After some research, note-taking editors fall into three categories: cloud-based (like Notion), local-database (like Affine), and local-file-based (like Typora, Obsidian, VSCode).

You can find plenty of complaints about cloud-based products — privacy, network dependency, data lock-in. But for me, the core issue is that these are all rich-text editors. Their markdown support isn't great, their proprietary formats become a burden on users, and your data ends up trapped inside. The local-database category has the same problem. So for me, local-file-based was the obvious choice.

## 4. Surveying Editor Frameworks

[en_04_editor_framework.mp3](../assets/audio/zditor/en/en_04_editor_framework.mp3|mode=audio)

Digging into editor frameworks, there are many options. Popular ones include ProseMirror and its wrapper tiptap, which I genuinely love. But at the time, tiptap's markdown support was quite limited and performance was poor. I also needed custom plugins for my formatting requirements, so I decided to do what tiptap does — build my own editor on top of ProseMirror.

I assumed it wouldn't be too hard, given all the existing ProseMirror plugins, the wealth of open-source libraries to reference, and AI assistance. In reality, the rabbit hole went much deeper than I expected. Cross-platform compatibility was a massive issue — especially with the Tauri framework I chose — leading to an endless stream of bugs around cursor behavior, selections, and platform differences.

## 5. Use Cases

[en_05_use_cases.mp3](../assets/audio/zditor/en/en_05_use_cases.mp3|mode=audio)

Let me walk through some of zditor's use cases. The original vision was something like Typora — focused on editing, WYSIWYG, with changes syncing to disk in real time. But over time I kept adding features and expanding the scope: document revision and annotation, a local NotebookLM, local Agent workflows, and more.

### Use Case 1: Writing & Canvas Creation

First, document revision and annotation. The idea is: you write an article, there might be typos or mistakes, and you ask AI to annotate them using revision syntax — marking what's wrong, why it's wrong, and what it should be. You then decide whether to accept each revision or handle it yourself.

### Use Case 2: Local NotebookLM

This is implemented by calling an Agent installed on your computer. Download a codebase, then use zditor to quickly generate study notes, slides, or even videos. Compared to NotebookLM, there are three advantages: **faster** — you can generate multiple images in parallel; **editable** — everything generated can be modified at any time; **better quality** — the Claude + NanoBanana combination outperforms Gemini alone.

### Use Case 3: Local Agent Hub

zditor connects to state-of-the-art Agents — direct integration with Claude Code, Gemini CLI, Codex, OpenClaw. You get the same level of intelligence inside your document editor that you'd expect from a code Agent.

## 6. The Tauri Mistake

[en_06_tauri_mistake.mp3](../assets/audio/zditor/en/en_06_tauri_mistake.mp3|mode=audio)

When choosing a framework early on, I compared Electron and Tauri. Tauri's selling points — smaller bundle size, Rust memory safety, faster startup — won me over.

Looking back, **this was the single biggest decision mistake in the entire project**, and the cost has been very real.

1. **Development velocity cut in half (at least)**. For equivalent features, Tauri is at least twice as hard to develop for as Electron — far weaker ecosystem, docs, reusable packages, and community knowledge.
2. **Compatibility is a nightmare**. Tauri relies on the system WebView — WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux — with significant behavioral differences between them. Even different OS versions have varying capabilities; a three-year-old system might need special patches for missing CSS/JS features. Editors are extremely sensitive to cursors, selections, IME input, and contenteditable behavior. WebKit/Safari has been a minefield: selection jumping, IME candidate box misalignment, dropped characters during composition… none of which exist on Chromium.
3. **UI consistency is hard to guarantee**. The same frontend code works fine on macOS but behaves differently on Windows with fonts, scrolling, and animations.
4. **Linux is nearly unusable**. WebKitGTK version fragmentation is severe, and differences between distros make it even worse.
5. **Performance isn't problem-free**. Cold startup time and bundle size are genuinely smaller — but runtime performance is limited by the system WebView. On Safari/WebKit, large document rendering and ProseMirror transaction processing runs at roughly half the speed of Chromium, which ends up being the bottleneck.
6. **Debugging is more complex**. A single bug could originate from the frontend, the Rust backend, the IPC bridge, or the system WebView. Diagnosing issues is significantly more expensive than Electron's cleaner architecture.

Why not migrate to Electron? Tauri does have real advantages — fine-grained permission controls, for instance. By contrast, Obsidian's third-party plugins on Electron can get nearly unrestricted system access, which seems genuinely dangerous. Also, a lot of logic has already been built on the Rust side, making migration costly. And I'm waiting for Tauri to ship a CEF version — if that happens, most of the above problems would be solved.

## 7. Roadmap

[en_07_roadmap.mp3](../assets/audio/zditor/en/en_07_roadmap.mp3|mode=audio)

On the near-term agenda: first, excalidraw canvas improvements — support for more markdown node types, so dragging an element from markdown to the canvas auto-creates the appropriate node type (audio, video, attachment, etc.). Then: a node toolbar for the canvas with AI capabilities similar to the markdown toolbar — converting nodes to a hand-drawn style, formatting, and so on. Also a lasso toolbar for batch operations on selected nodes. Finally, **AI-powered markdown-to-canvas mind map conversion** at the node level — the current implementation is still pretty rough.

Beyond the canvas, I'm planning a mobile app. Tauri supports mobile natively, so the lift should be smaller — mainly UI adaptation (e.g., putting the editor toolbar above the keyboard) and removing unsupported features like drag-and-drop. Sync is the other challenge: mobile platforms are closed systems, and using the app without sync is painful. Haven't settled on a solution yet — feel free to leave suggestions in the comments.

## 8. Plugin System

[en_08_plugins.mp3](../assets/audio/zditor/en/en_08_plugins.mp3|mode=audio)

If all of the above comes together, I might build a plugin system. Some say plugins are Obsidian's moat — I don't think it's that hard to replicate. 90% of Obsidian's plugins have very few users, and in the AI era, most of those could be rebuilt in a couple of hours. The small number of high-quality, heavily-used plugins can become official features. In the AI era, the real ecosystem barrier is those few, genuinely high-quality plugins.

## 9. Commercialization

[en_09_commercialization.mp3](../assets/audio/zditor/en/en_09_commercialization.mp3|mode=audio)

Software is fundamentally about scale — marginal cost approaches zero, so the upfront investment only makes sense if you grow the user base. The flip side: if your target audience is inherently small, don't over-invest; if your space has too many alternatives and you're not clearly the best, you can't grow the user base and you'll never recoup costs.

For zditor, the past month-plus has brought some paying users, but nowhere near enough. Token costs alone have already exceeded tens of thousands, never mind thousands of hours of labor. Selling dozens or a few hundred licenses won't cover it. **Growing internationally is the top priority** — it's been the plan from the start. Worth noting: most competing indie apps are just editor wrappers with a new UI, almost all following the local-database route. In my view, that approach has little hope of scaling. Say you hit 10,000–20,000 users with a 2% conversion rate — that's a few hundred paying users. Once the developer stops maintaining it, users' data is likely stuck in a dead app forever. That's exactly why I support markdown and excalidraw instead of building my own canvas format: even if zditor ultimately fails, users can migrate their data easily. And since it's a markdown editor at its core, double-clicking a markdown file will still work fine.

### Monetization Path

My commercialization philosophy for zditor: **phased evolution, respecting early users**. Phase 1 is perpetual licensing — the current model. Whether someone pays for a perpetual license is the cleanest signal of real user intent, cleaner than any survey or free trial. If we can't sell a few hundred licenses in this phase, the product is probably done. Phase 2 is subscriptions (for new users) — once the product matures and the update cadence stabilizes, we'll shift to subscriptions to match the ongoing cost structure. **Old users keep their old deal; new users get the new model.** Existing perpetual license holders won't be forced onto subscriptions or downgraded to a lesser tier. Further down the road, I plan to offer AI services and sync — if we get there, early perpetual users will receive a 10% discount.

## 10. Closing Thoughts

[en_10_closing.mp3](../assets/audio/zditor/en/en_10_closing.mp3|mode=audio)

The goal is simply to make it as good as possible. The UI still doesn't meet my own standards, but fine-tuning it takes enormous effort — going from 50 to 80 is easy; going from 80 to 100 is very hard. My honest view: within 1–2 years, zditor could realistically meet the needs of 50–80% of Obsidian's target users, which is a user base in the millions. Technically, surpassing Obsidian isn't that hard — commercially, we may not get the chance to find out. Over the years I've built a lot of projects: on-device AI models, Bluetooth chat apps, zbook — every one of them cost real effort, and every one of them failed. I don't know if this one will go further. Whatever happens, thank you for your support.
