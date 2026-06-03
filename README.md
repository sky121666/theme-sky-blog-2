# Theme Sky Blog 2 - 终端风格主题

> 🖥️ 一款为 Halo CMS 打造的复古终端风格主题，支持全键盘操作。

![Terminal Theme](docs/demo.webp)

## ✨ 主要功能

### 🟢 沉浸式终端界面
整个博客模拟命令行终端操作体验，包含 CRT 视觉特效：
- 扫描线覆盖效果
- 文本荧光辉光
- 闪烁的光标
- Fira Code 等宽代码字体

### ⌨️ 键盘导航与指令

#### 列表页 (首页、分类、标签)

| 命令 | 描述 |
|------|------|
| `ls` | 列出当前目录内容（文章、分类或标签） |
| `cd <path>` | 进入目录 (例如 `cd categories`, `cd ai`) |
| `cd ..` | 返回上一级目录 |
| `pd` / `npage` | 下一页 (Page Down) |
| `pu` / `ppage` | 上一页 (Page Up) |
| `back` | 浏览器后退 |
| `help` | 显示当前页面可用命令 |
| `clear` | 清空终端屏幕 |
| `search [keyword]` | 打开官方搜索组件弹窗（需安装并启用搜索插件） |

#### 文章详情页 (Post)

| 命令 | 描述 |
|------|------|
| `next` | 跳转到下一篇文章 |
| `prev` | 跳转到上一篇文章 |
| `cd ..` | 返回文章列表 |
| `toc` | 显示当前文章目录 |
| `jump <n>` | 跳转到目录第 n 项 |
| `top` | 滚动到顶部 |
| `bottom` | 滚动到底部 |
| `copy` | 复制当前文章链接 |
| `back` | 浏览器后退 |
| `help` | 显示当前页面可用命令 |
| `clear` | 清空终端屏幕 |

#### 键盘快捷键 (文章阅读模式)

> ⚠️ **注意**：使用键盘滚动前，请按 `Esc` 键或点击页面空白处，确保终端输入框**未被选中**。

| 按键 | 功能 |
|------|------|
| `Esc` | 清空输入并取消焦点 (启用滚动) |
| `↑` / `k` | 向上滚动 |
| `↓` / `j` | 向下滚动 |
| `PageUp` | 向上翻页 |
| `PageDown` / `Space` | 向下翻页 |
| `Home` | 跳转到顶部 |
| `End` | 跳转到底部 |

### 🧭 终端特性

- **Tab 自动补全**：输入命令或路径的前几个字母，按 `Tab` 键自动补全。
- **命令历史**：使用方向键 `↑` / `↓` 快速切换之前输入过的命令。
- **上下文感知路径**：终端提示符会显示当前的虚拟路径 (例如 `~/blog/categories/ai$`)。
- **显示优化**：`ls` 命令显示友好的中文标题，支持中文路径导航。

### 🎨 终端风格组件

所有内容元素都进行了终端风格化适配：

| 元素 | 样式效果 |
|------|----------|
| 标题 | 带有 `#` `##` `###` 前缀装饰 |
| 代码块 | 顶部带有 `$ cat code.sh` 状态栏 |
| 引用块 | 左侧带有 `>` 标记的边框 |
| 列表 (ul) | 文件树风格：`├──` `└──` |
| 列表 (ol) | 括号风格：`[1]` `[2]` |
| 任务列表 | 交互式复选框：`[ ]` / `[x]` |
| 表格 | 绿色边框，鼠标悬停高亮 |
| 图片 | 带有 `[ IMAGE ]` 标注框 |
| 视频 | 带有 `▶ MEDIA PLAYER :: VIDEO` 播放器外观 |
| 音频 | 带有 `♪ MEDIA PLAYER :: AUDIO` 播放器外观 |
| 链接 | 虚线下划线，悬停反色效果 |
| 高亮 | 反色显示 (绿底黑字) |

### 🔗 链接卡片 (Hyperlink Card)

完美适配 Halo 的链接卡片组件，自动继承终端主题：
- **常规卡片**：带有 `$ curl -I` 模拟请求头样式的顶部栏。
- **网格卡片**：极简边框风格。
- **行内卡片**：带有 `[链接]` 样式的方括号装饰。

全部组件支持深色模式，使用半透明背景和荧光绿边框。

## 🛠️ 开发指南

### 环境要求

- Node.js 20.19+ 或 22.12+（CI 使用 Node.js 22；Vite 7 要求 `^20.19.0 || >=22.12.0`）
- pnpm 10.x（项目通过 `packageManager` 固定 pnpm 10.6.5）
- zip 命令行工具（用于从主题包中移除非主题运行文件）

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 打包构建

```bash
pnpm build
```

构建完成后会生成 `dist/theme-sky-blog-2-<version>.zip`。Halo 已安装主题的资源版本来自 Halo
运行态主题元数据；如果页面仍引用旧的 `main.iife.js?v=<old-version>`，需要在 Halo 中重新上传/重载新主题包，
仅重启容器不会刷新已安装主题版本。

### 发布前检查

```bash
pnpm lint
pnpm verify:theme-updates
pnpm build
pnpm verify:package
pnpm audit --audit-level moderate
```

> `pnpm audit` 主要检查本地构建与打包链路依赖；如上游工具链短期仍有传递依赖告警，应在发布说明中记录剩余风险。
> `pnpm build` 当前可能输出 Node.js `[DEP0205] module.register()` 上游工具链警告；构建退出码为 0 时不阻塞发布。

运行态资源版本可用以下只读检查确认：

```bash
pnpm check:runtime-version
```

如输出 `Runtime asset version mismatch`，说明 Halo 当前页面仍在引用旧版本资源，需要重新上传或重载
`dist/theme-sky-blog-2-<version>.zip`。

如果本机环境变量中已有 `HALO_PAT`、`FIVEEE_PAT` 或 `HALO_TOKEN`，可调用 Halo Console reload 接口并自动复查版本：

```bash
pnpm reload:theme
```

## ✅ 功能验证指南 (Quick Start)

安装主题后，建议按照以下步骤验证功能是否正常：

### 1. 终端交互验证
1. 打开博客首页。
2. 点击底部的终端输入框（`Home` 键旁边的闪烁光标处）。
3. 输入 `ls` 并按 `Enter` 键 —— 应显示 `categories/`, `tags/` 和最新文章列表。
4. 输入 `help` 并按 `Enter` 键 —— 应显示可用命令列表。

### 2. 键盘导航验证
1. 输入 `cd categories` 并按 `Enter` —— 页面应无刷新跳转到分类列表，路径变更为 `~/blog/categories$`。
2. 输入 `cd ..` 并按 `Enter` —— 应返回首页。
3. 尝试输入 `cd ca` 然后按 `Tab` 键 —— 应自动补全为 `cd categories`。

### 3. 文章阅读体验验证
1. 进入任意一篇文章。
2. **关键步骤**：按 `Esc` 键，确保光标从输入框移开。
3. 按 `j` 或 `↓` 键 —— 页面应平滑向下滚动。
4. 按 `Space` (空格) 键 —— 页面应向下翻页。
5. 输入 `next` 并按 `Enter` —— 应跳转到下一篇文章。
6. 如果文章含有二级或三级标题，页面应显示 `[TOC]` 目录和 `READ_PROGRESS` 阅读进度。
7. 输入 `toc` 并按 `Enter` —— 应显示文章目录；输入 `jump 1` 应跳转到第一项。

### 4. 样式适配验证

- 检查文章内的代码块是否带有 `$ cat ...` 顶部栏。
- 检查链接是否显示为绿色虚线下划线。
- 检查图片是否有 `[ IMAGE ]` 边框包裹。

### 5. 搜索入口验证

- 已安装搜索插件且全局存在 `SearchWidget.open()` 时，点击 `[SEARCH]` 或输入 `search` 应打开官方搜索弹窗。
- 输入 `search halo` 时，应打开官方搜索弹窗，并在终端提示到搜索框内输入关键词 `halo`。
- 未安装搜索插件时，主题不会提供内置 `/search` 页面。

## 📁 项目结构

```
theme-sky-blog-2/
├── src/
│   ├── main.ts          # 前端入口
│   ├── common/          # Pjax、SEO 数据同步、任务列表、日志等共享运行时
│   ├── features/        # 终端命令、文章工具、自动补全、打字机等交互功能
│   ├── images/          # 主题静态图片源文件
│   └── styles/          # base / content / auth / tailwind 分层样式
├── templates/
│   ├── assets/          # 编译产出目录
│   ├── modules/
│   │   └── layout.html  # 全局布局 (包含 Pjax 容器与终端)
│   ├── gateway_fragments/ # 登录、注册、密码重置等网关片段
│   ├── index.html       # 首页模板
│   ├── post.html        # 文章详情页
│   ├── categories.html  # 分类列表页
│   ├── category.html    # 分类详情页
│   ├── tags.html        # 标签列表页
│   └── tag.html         # 标签详情页
├── scripts/             # 主题包清理与本地约束验证
├── settings.yaml        # 主题设置项
└── theme.yaml           # 主题元数据配置
```

### 6. 组件适配说明

本主题目前仅适配了 Halo 的基础核心组件，保持极简体验：

- ✅ **核心功能**：文章列表、文章详情、分类列表、标签列表。
- ✅ **基础组件**：链接卡片。
- ⚠️ **搜索入口**：提供 `[SEARCH]` 按钮和 `search` 命令，调用官方搜索组件 `SearchWidget.open()`；搜索能力依赖站点安装并启用搜索插件。
- ⚠️ **评论入口**：文章页可通过主题设置开启 `[COMMENTS]` 区块，调用 Halo `<halo:comment>` 扩展点；评论能力依赖站点安装并启用官方评论组件 `PluginCommentWidget`。当前按 `PluginCommentWidget v3.1.2` 的 `script[data-pjax]` 初始化方式适配；主题自身要求 Halo `>=2.23.0`。
- ❌ **组件适配**：目前**暂未适配**相册等第三方插件。

## 📝 开源协议

MIT

## 💬 讨论

如果你对主题有什么建议或者意见，欢迎提 PR & Issue。

| 企业微信（备注进群） | QQ群 |
|:---:|:---:|
| <img width="200" src="https://api.minio.yyds.pink/kunkunyu/files/2025/02/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250212142105-pbceif.jpg" /> | <img width="200" src="https://api.minio.yyds.pink/kunkunyu/files/2025/05/qq-708998089-iqowsh.webp" /> |

> ⚠️ 卖服务器的广告人，就不要加了。

---
