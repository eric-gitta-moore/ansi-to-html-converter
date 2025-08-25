
# ANSI 双功能转换器

一个功能强大的在线工具，支持 ANSI 转义序列与 HTML、纯文本之间的双向转换。

## 🌟 功能特性

### 双向转换支持
- **ANSI → HTML**：将包含 ANSI 颜色控制符的终端输出转换为彩色 HTML 显示
- **ANSI → 纯文本**：去除所有 ANSI 颜色控制符，获得干净的纯文本

### 丰富的 ANSI 支持
- ✅ 标准颜色（30-37, 40-47）：黑、红、绿、黄、蓝、洋红、青、白
- ✅ 亮色系列（90-97, 100-107）：高亮度颜色变体
- ✅ 样式控制：粗体（1m）、下划线（4m）、重置（0m）
- ✅ 前景色和背景色完整支持



### 用户友好的界面
- 🎨 现代化设计，支持深色/浅色主题切换
- 🔄 一键转换模式切换
- 📋 一键复制转换结果
- 🚀 实时预览转换效果
- 📝 内置多种示例数据

## 🚀 快速开始

### 在线使用
- **在线工具**：[https://eric-gitta-moore.github.io/ansi-to-html-converter](https://eric-gitta-moore.github.io/ansi-to-html-converter)

### 本地开发

#### 环境要求
- Node.js 18+ 
- pnpm 8+

#### 安装依赖
```bash
pnpm install
```

#### 启动开发服务器
```bash
pnpm run dev
```

#### 构建生产版本
```bash
pnpm run build
```

#### 预览生产版本
```bash
pnpm run preview
```

## 📖 使用指南

### ANSI → HTML 转换

1. **选择转换模式**：确保切换按钮显示为 "ANSI → HTML"
2. **输入 ANSI 文本**：在左侧输入区域粘贴包含 ANSI 转义序列的文本
3. **查看转换结果**：
   - **预览标签**：查看渲染后的彩色效果
   - **HTML 代码标签**：获取转换后的 HTML 源代码
4. **复制结果**：点击复制按钮获取 HTML 代码

#### 示例输入
```bash
\x1b[32m[INFO]\x1b[0m Server started successfully
\x1b[33m[WARN]\x1b[0m Configuration file not found
\x1b[31m[ERROR]\x1b[0m Database connection failed
```

#### 示例输出
```html
<span style="color: #00cd00;">[INFO]</span> Server started successfully<br>
<span style="color: #cdcd00;">[WARN]</span> Configuration file not found<br>
<span style="color: #cd0000;">[ERROR]</span> Database connection failed
```

### ANSI → 纯文本 转换

1. **切换转换模式**：点击切换按钮，选择 "ANSI → 纯文本" 模式
2. **输入 ANSI 文本**：在左侧输入区域粘贴包含 ANSI 转义序列的文本
3. **查看转换结果**：在右侧查看去除颜色控制符后的纯文本
4. **复制结果**：点击复制按钮获取纯文本

#### 示例输入
```bash
\x1b[32m[INFO]\x1b[0m Server started successfully
\x1b[33m[WARN]\x1b[0m Configuration file not found
\x1b[31m[ERROR]\x1b[0m Database connection failed
```

#### 示例输出
```
[INFO] Server started successfully
[WARN] Configuration file not found
[ERROR] Database connection failed
```

## 🎯 应用场景

### 开发者工具
- **日志美化**：将终端日志转换为网页友好的 HTML 格式
- **文档编写**：在技术文档中展示彩色的命令行输出
- **博客文章**：在文章中嵌入美观的终端演示效果

### 运维场景  
- **监控面板**：将服务器日志转换为 Web 界面显示
- **报告生成**：创建包含彩色终端输出的 HTML 报告
- **故障排查**：保存和分享带颜色的错误日志

### 教学培训
- **编程教程**：展示终端操作的彩色效果
- **在线课程**：在网页中演示命令行工具使用
- **技术分享**：制作包含终端输出的演示文稿

## 🔧 技术架构

### 前端技术栈
- **React 18**：现代化的用户界面框架
- **TypeScript**：类型安全的 JavaScript 超集
- **Vite**：快速的构建工具和开发服务器
- **Tailwind CSS**：实用优先的 CSS 框架
- **shadcn/ui**：高质量的 React 组件库
- **Lucide React**：美观的图标库

### 核心算法
- **ANSI 解析器**：正则表达式匹配和状态管理
- **纯文本处理**：高效的 ANSI 控制符移除算法
- **样式堆栈**：嵌套样式的正确处理

## 📚 ANSI 颜色代码参考

### 标准颜色（前景色 30-37，背景色 40-47）
| 颜色 | 前景色 | 背景色 | 十六进制值 |
|------|--------|--------|------------|
| 黑色 | 30 | 40 | #000000 |
| 红色 | 31 | 41 | #cd0000 |
| 绿色 | 32 | 42 | #00cd00 |
| 黄色 | 33 | 43 | #cdcd00 |
| 蓝色 | 34 | 44 | #0000ee |
| 洋红 | 35 | 45 | #cd00cd |
| 青色 | 36 | 46 | #00cdcd |
| 白色 | 37 | 47 | #e5e5e5 |

### 亮色系列（前景色 90-97，背景色 100-107）
| 颜色 | 前景色 | 背景色 | 十六进制值 |
|------|--------|--------|------------|
| 亮黑色 (灰) | 90 | 100 | #7f7f7f |
| 亮红色 | 91 | 101 | #ff0000 |
| 亮绿色 | 92 | 102 | #00ff00 |
| 亮黄色 | 93 | 103 | #ffff00 |
| 亮蓝色 | 94 | 104 | #5c5cff |
| 亮洋红 | 95 | 105 | #ff00ff |
| 亮青色 | 96 | 106 | #00ffff |
| 亮白色 | 97 | 107 | #ffffff |

### 样式控制代码
| 功能 | 代码 | 说明 |
|------|------|------|
| 重置 | 0m | 清除所有样式 |
| 粗体 | 1m | 加粗文本 |
| 下划线 | 4m | 添加下划线 |

## 🛠️ 获取带颜色的 Shell 输出

### 方法一：使用 script 命令
```bash
# 记录终端会话（包含颜色）
script -c "your-command" /dev/null

# 示例：记录ls命令的彩色输出
script -c "ls --color=always" /dev/null
```

### 方法二：强制启用颜色输出
```bash
# Git命令
git status --color=always
git log --color=always --oneline

# ls命令  
ls --color=always

# grep命令
grep --color=always "pattern" file.txt
```

### 方法三：直接复制粘贴
大多数现代终端支持直接复制包含 ANSI 代码的文本，可以直接粘贴到转换器中使用。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 开发流程
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 配置的代码规范
- 添加适当的注释和文档
- 确保所有功能都有对应的测试

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- **ANSI 标准参考**：[ANSI Escape Codes - Wikipedia](https://en.wikipedia.org/wiki/ANSI_escape_code)
- **HTML 颜色参考**：[MDN CSS Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color)

## ❓ 常见问题

### Q: 为什么某些颜色在转换后看起来不一样？
A: ANSI 标准只支持 16 种基础颜色，而 HTML 支持数百万种颜色。工具会将输入的颜色映射到最接近的 ANSI 标准颜色。

### Q: 如何处理嵌套的样式？
A: 工具支持嵌套样式的正确处理，会维护样式堆栈确保开闭标签匹配。

### Q: 支持 256 色或 RGB 色彩模式吗？
A: 目前版本专注于 16 色标准模式，未来版本会考虑支持扩展色彩模式。

### Q: 转换后的 HTML 可以直接在网页中使用吗？
A: 是的，转换后的 HTML 使用标准的内联样式，可以直接嵌入到任何网页中。

### Q: ANSI 去色功能支持哪些格式的转义序列？
A: 支持所有常见格式：\x1b、\u001b、\033 等，以及各种 ANSI 控制序列。

---

**Made with ❤️ for developers who love colorful terminals!**
