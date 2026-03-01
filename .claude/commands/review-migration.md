# 审查 Extension 迁移变更

请系统性地审查我迁移到新 spec API 的代码变更。

## 审查要点

### 1. 基本结构检查
- [ ] 是否正确继承 `Extension` 而不是 `Node`/`Mark`
- [ ] 是否添加 `readonly extensionType: ExtensionType.NODE/MARK`
- [ ] 是否实现 `get spec(): ExtensionSpec`
- [ ] 旧的方法定义是否已删除（除非有特殊原因保留）

### 2. Schema 定义
- [ ] `schema` 字段是否正确从旧 `get schema()` 迁移
- [ ] `toDOM` 返回值是否使用 `as const` 断言
- [ ] 有子节点的元素是否包含 `0` 占位符
- [ ] 自闭合标签（br, hr）是否正确不包含 `0`

### 3. Commands 定义
- [ ] 简单 Mark/Node 是否使用 `commands: "auto"`
- [ ] 复杂命令是否使用 `commands: (ctx) => [...CommandSpec]`
- [ ] 是否有适当的类型守卫 `if (!ctx.type) return []`
- [ ] 是否正确类型断言 `ctx.type as NodeType/MarkType`

### 4. InputRules 定义
- [ ] 是否正确迁移到 `inputRules: (ctx) => [...InputRuleSpec]`
- [ ] 是否返回正确的 `{ rule: InputRule }` 格式
- [ ] 是否有类型守卫和断言

### 5. KeyBindings 定义
- [ ] 是否从 `keyBindingMap()` 迁移到 `keyBindings: (ctx) => [...KeyBindingSpec]`
- [ ] 是否返回 `{ name: string, command: Command }[]` 格式
- [ ] 命令实现是否正确

### 6. Plugins 定义
- [ ] 是否从 `get plugins()` 迁移到 `plugins: (ctx) => Plugin[]`
- [ ] Plugin 是否能正确访问 `this.editor`
- [ ] Plugin 逻辑是否保持一致

### 7. Markdown 相关
- [ ] `markdownToken` 是否在 spec 中声明
- [ ] `parseMarkdown` 是否正确迁移
- [ ] `markdownItPlugins` 是否正确迁移（如果有）

### 8. 特殊情况
- [ ] 是否有需要保留的旧方法（如 handleClick、constructor 等）
- [ ] 类方法是否正确保留（使用箭头函数的 handler 等）
- [ ] 是否有注释说明特殊处理

## 审查流程

1. **列出所有变更文件**
2. **逐个审查每个文件**：
   - 对比旧代码结构
   - 验证新代码正确性
   - 检查类型安全
   - 验证功能等价性
3. **运行类型检查** `npx tsc --noEmit`
4. **总结发现的问题**

## 输出格式

对于每个文件，提供：

```
### 文件名.ts

#### ✅ 正确的地方
- 列出正确迁移的部分

#### ⚠️ 需要注意的地方
- 列出可能的问题或改进建议

#### 🔍 特殊处理
- 列出特殊情况及其合理性
```

请开始审查，从 Marks 开始，然后是 Nodes，最后是 Extensions。
