# Theme Sky Blog 2 - 终端风格主题

> 🖥️ 一款为 Halo CMS 打造的复古终端风格主题，支持全键盘操作。

[1.3.0 更新说明](docs/release-1.3.0.md) · [兼容与验收记录](docs/upgrade-2026-09-24.md#latest-2026-11-18)

## ✨ 主要功能

### 🟢 沉浸式终端界面

整个博客模拟命令行终端操作体验，包含 CRT 视觉特效：

- 扫描线覆盖效果
- 文本荧光辉光
- 闪烁的光标
- 适配系统等宽字体栈

在 Halo 后台的「主题 → Sky Blog 2 → 外观设置」中可选择**终端布局**。默认的经典文件表将标题放在左侧，Unix 长列表将文章权限和日期放在标题前，命令输入接在列表下方。首页、分类、标签、作者和归档共用文件列表样式，阅读页、插件公共页面和错误页继承博客外观。终端配色独立设置。

博客页面宽度由 `src/styles/layout.css` 的 `--terminal-page-width` 控制，外侧留白使用 `--terminal-page-gutter`。列表、正文、插件公共区域和错误页使用相同的左右边界。文件列表列宽集中在 `src/styles/file-list.css`。登录、注册、密码重置和退出确认的版式及宽度定义在 `src/styles/auth.css`，配色与博客共用后台的终端配色方案。

### 页面切换

Halo 渲染完整 HTML。站内普通链接和终端命令通过 swup 4 切换正文，终端输入框与命令历史跨页保留。浏览器前进、后退会恢复对应条目的阅读位置。同页目录和评论链接可重复定位。登录、下载、插件公共布局，以及需要切换可执行脚本的页面使用浏览器整页导航。Halo 默认给文章和独立页面注入按内容计数的脚本，公开列表进入这类详情页时会重新加载文档。文章底部的 `[BACK]` 可以返回原列表。

### ⌨️ 键盘导航与指令

#### 列表页 (首页、分类、标签)

| 命令               | 描述                                         |
| ------------------ | -------------------------------------------- |
| `ls`               | 列出当前目录内容（文章、分类或标签）         |
| `cd <path>`        | 进入目录 (例如 `cd categories`, `cd ai`)     |
| `cd ..`            | 返回上一级目录                               |
| `pd` / `npage`     | 下一页 (Page Down)                           |
| `pu` / `ppage`     | 上一页 (Page Up)                             |
| `back`             | 浏览器后退                                   |
| `help`             | 显示当前页面可用命令                         |
| `clear`            | 清空终端屏幕                                 |
| `search [keyword]` | 打开官方搜索组件弹窗（需安装并启用搜索插件） |

无参数 `ls` 显示当前列表页的文章和可见目录，不计入 `../` 返回入口；`ls ~/blog` 列出虚拟根目录及最多 50 篇近期文章，必要时从 Halo 内容 API 刷新。列表底部的 `files found` 显示该列表的文章总数。

#### 文章详情页 (Post)

| 命令               | 描述                                         |
| ------------------ | -------------------------------------------- |
| `next`             | 跳转到下一篇文章                             |
| `prev`             | 跳转到上一篇文章                             |
| `cd ..`            | 返回文章列表                                 |
| `toc`              | 显示当前文章目录                             |
| `jump <n>`         | 跳转到目录第 n 项                            |
| `top`              | 滚动到顶部                                   |
| `bottom`           | 滚动到底部                                   |
| `copy`             | 复制当前文章链接                             |
| `back`             | 浏览器后退                                   |
| `help`             | 显示当前页面可用命令                         |
| `clear`            | 清空终端屏幕                                 |
| `search [keyword]` | 打开官方搜索组件弹窗（需安装并启用搜索插件） |

`next` 跳转到发布时间较新的文章，`prev` 跳转到发布时间较早的文章。文章底部的 `[BACK]` 返回同源来源页；直接打开文章时返回首页。`cd ..` 始终返回虚拟父目录首页。

#### 键盘快捷键 (文章阅读模式)

阅读键在正文获得焦点时生效。正在输入命令时，按 `Esc` 可清空输入、取消待显示的命令结果并退出命令框。

| 按键                 | 功能                          |
| -------------------- | ----------------------------- |
| `Esc`                | 清空输入并取消焦点 (启用滚动) |
| `↑` / `k`            | 向上滚动                      |
| `↓` / `j`            | 向下滚动                      |
| `PageUp`             | 向上翻页                      |
| `PageDown` / `Space` | 向下翻页                      |
| `Home`               | 跳转到顶部                    |
| `End`                | 跳转到底部                    |

### 🧭 终端特性

- **Tab 自动补全**：输入命令或路径前缀后，有可用候选时按 `Tab` 补全。空输入或无候选时，`Tab` 移至下一项，`Shift+Tab` 可反向移动焦点。
- **命令历史**：使用方向键 `↑` / `↓` 快速切换之前输入过的命令。
- **上下文感知路径**：终端提示符会显示当前的虚拟路径 (例如 `~/blog/categories/ai$`)。
- **显示优化**：`ls` 命令显示友好的中文标题，支持中文路径导航。

### 🎨 终端风格组件

所有内容元素都进行了终端风格化适配：

| 元素      | 样式效果                                  |
| --------- | ----------------------------------------- |
| 标题      | 带有 `#` `##` `###` 前缀装饰              |
| 代码块    | 顶部带有 `$ cat code.sh` 状态栏           |
| 引用块    | 左侧带有 `>` 标记的边框                   |
| 列表 (ul) | 文件树风格：`├──` `└──`                   |
| 列表 (ol) | 括号风格：`[1]` `[2]`                     |
| 任务列表  | 交互式复选框：`[ ]` / `[x]`               |
| 表格      | 主题色边框，鼠标悬停高亮                  |
| 图片      | 带有 `[ IMAGE ]` 标注框                   |
| 视频      | 带有 `▶ MEDIA PLAYER :: VIDEO` 播放器外观 |
| 音频      | 带有 `♪ MEDIA PLAYER :: AUDIO` 播放器外观 |
| 链接      | 虚线下划线，悬停反色效果                  |
| 高亮      | 反色显示 (主题色背景)                     |

### 🔗 链接卡片 (Hyperlink Card)

适配 Halo 链接卡片的主题样式，自动继承终端配色：

- **常规卡片**：带有 `$ curl -I` 模拟请求头样式的顶部栏。
- **网格卡片**：极简边框风格。
- **行内卡片**：带有 `[链接]` 样式的方括号装饰。

卡片使用半透明深色背景和主题色边框，颜色跟随主题设置。

## 🛠️ 开发指南

### 环境要求

- Halo `>=2.27.0`。1.3.0 的页面与认证验证使用 Halo CE 2.27.0 和 Halo Pro 2.27.3，覆盖范围见 [验收记录](docs/upgrade-2026-09-24.md#latest-2026-11-18)。
- Node.js `^24.15.0`（Halo 官方发布使用 Node.js 24）
- pnpm 12.x（Halo 官方发布使用 pnpm 12.6.0）
- `zip`、`unzip` 和 `zipinfo` 命令行工具（用于打包和校验主题 ZIP）

本项目使用 TypeScript 7.0.2 的 `tsc` 构建，`typescript-eslint` 通过官方的 `@typescript/typescript6` 兼容包读取 TypeScript 6 API。

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

`pnpm dev` 持续生成供挂载式预览使用的资源。需要一次性生成 JS/CSS、不生成发布 ZIP 时，运行：

```bash
pnpm build-only
```

### 打包构建

```bash
pnpm build
```

构建完成后会生成用于发布的 `dist/theme-sky-blog-2-<version>.zip`。本地目录挂载式开发不通过控制台
“上传安装 / 升级”刷新已启用主题；修改 `theme.yaml` 或升级版本后，必须调用
`PUT /apis/api.console.halo.run/v1alpha1/themes/theme-sky-blog-2/reload` 重新载入主题元数据。
仅重启容器不会刷新已安装主题版本。
若站点启用了 Halo 页面缓存，旧的页面 HTML 可能继续引用上一版资源；Reload 后还需清理页面缓存，
再用下方的 `smoke:live` 验证首页与列表页的真实导航。

### 发布前检查

```bash
pnpm check
pnpm build
pnpm audit --audit-level moderate
```

`pnpm test` 使用 Node 原生测试运行器快速执行完整回归，并通过源码清单防止可执行模块漏测；
`pnpm test:coverage` 在此基础上额外启用覆盖率门禁，全局要求行覆盖不低于 95%、分支覆盖不低于 85%、函数覆盖
不低于 95%，并要求 `alpine.ts`、
`navigation.ts`、`runtime.ts` 三个关键运行时文件的行、分支、函数覆盖率分别不低于 95%。测试覆盖 BFCache
解锁、导航竞态与失败回滚、终端命令/历史/补全、页面数据与虚拟路径、任务列表、文章工具、插件契约、模板语义和
发布包规则。`pnpm check` 执行本地测试和静态检查。`pnpm build` 生成并校验 ZIP，同时输出 SHA-256。
也可以用 `pnpm verify:package -- --strict-dist` 单独复验已构建的包。

### 发布到 GitHub 和 Halo 应用市场

在干净的发布提交上创建对应的 Git 标签，运行 `pnpm check:release -- --tag vX.Y.Z` 核对标签、提交和版本。
本地检查和审计通过后，在 GitHub 公开对应的 Release 并填写更新说明。公开 Release 会触发官方工作流，重新构建主题、上传 ZIP 并同步应用市场。 [Halo 官方主题发布工作流](https://github.com/halo-sigs/reusable-workflows/tree/v5.0.1#theme)

正式构建还会核对标签和提交，执行完整的中危及以上依赖审计，并校验生成的主题包。检查失败会停止上传和同步。
`v1.3.0` 的一次性审计例外记载于 [验收记录](docs/upgrade-2026-09-24.md#latest-2026-11-18)。

首页运行态资源版本可用以下只读检查确认：

```bash
pnpm check:runtime-version
```

如输出 `Runtime asset version mismatch`，说明 Halo 首页仍在引用旧版本资源，需要执行主题 Reload；
若其他页面仍引用旧版本，还要清理 Halo 页面缓存。不需要上传 ZIP。

需要验证本地 Halo 实际返回的文件内容、浏览器无缓存加载、真实局部导航和 390px 布局时，运行只读 smoke：

```bash
HALO_BASE_URL=http://127.0.0.1:8090 pnpm smoke:live
```

该命令会使用临时 Chrome profile，通过 CDP 禁用浏览器缓存并绕过 Service Worker，对比线上 CSS/JS 与
`templates/assets` 的 SHA-256，并检查基础无障碍语义、稳定布局和横向溢出。日志记录首页 HTML、CSS、JS 字节数，
以及桌面首页的 DOM 节点数、资源数和浏览器报告的传输字节数。

导航测试先用 CDP 暂停首页到分类页的响应，在当前浏览器页签临时添加并激活 `#main` 链接，然后放行响应。请求结束后继续观察 1 秒，检查首页锚点、内容和命令行对象均保留，且主框架 Document 请求为零。
随后再次点击分类链接，要求目标返回一次 HTML Fetch/XHR、主框架 Document 请求为零、终端输入框保持同一对象。
最后点击分类页的登录链接，要求一次主框架 Document 请求，并在新文档中找到可见的登录表单。该样本需要向匿名访客显示登录入口。
脚本只读访问站点，不调用 Reload API，也不修改 Halo 设置。

`CHROME_PATH` 优先级最高；未指定时会依次尝试系统 Chrome/Chromium 与本机
Playwright/Puppeteer 缓存的 Chrome for Testing 或 headless shell，且只在浏览器启动失败时切换候选程序。插件
表面只报告 `observed` 或 `skipped`，没有真页样本不会伪装为通过；仅 HTTP 校验也不能满足完整 smoke 验收。

如果本机环境变量中已有 `HALO_PAT`、`FIVEEE_PAT` 或 `HALO_TOKEN`，可调用 Halo Console reload 接口并自动复查版本：

```bash
pnpm reload:theme
```

## ✅ 功能验证指南 (Quick Start)

安装主题后，建议按照以下步骤验证功能是否正常：

### 1. 终端交互验证

1. 打开博客首页。
2. 点击底部的终端输入框（`Home` 键旁边的闪烁光标处）。
3. 输入 `ls` 并按 `Enter` 键 —— 应显示当前页文章；启用“显示固定文件夹”时还会显示 `categories/` 和 `tags/`。
4. 输入 `help` 并按 `Enter` 键 —— 应显示可用命令列表。

### 2. 键盘导航验证

1. 输入 `cd categories` 并按 `Enter` —— 页面应无刷新跳转到分类列表，路径变更为 `~/blog/categories$`。
2. 输入 `cd ..` 并按 `Enter` —— 应返回首页。
3. 尝试输入 `cd ca` 然后按 `Tab` 键 —— 应自动补全为 `cd categories/`。

### 3. 文章阅读体验验证

1. 进入任意一篇文章。
2. 用键盘打开文章后直接使用阅读键。如果此前正在输入命令，按 `Esc` 退出命令框。
3. 按 `j` 或 `↓` 键 —— 页面应平滑向下滚动。
4. 按 `Space` (空格) 键 —— 页面应向下翻页。
5. 聚焦终端后输入 `next` 并按 `Enter`，有下一篇文章时应打开它。在手机上可展开 `[TERMINAL / MENU]` 使用命令。
6. 含二级或三级标题时可展开 `[TOC]`。正文末尾进入阅读区时，`READ_PROGRESS` 应为 100%，下方的评论和返回区不计入阅读距离。
7. 输入 `toc` 并按 `Enter` —— 应显示文章目录；输入 `jump 1` 应跳转到第一项。

### 4. 样式适配验证

- 检查文章内的代码块是否带有 `$ cat ...` 顶部栏。
- 检查链接是否显示为主题色虚线下划线。
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
│   ├── common/          # swup 局部导航、Head 元数据同步、任务列表、日志等共享运行时
│   ├── features/        # 终端命令、文章工具、自动补全、打字机等交互功能
│   ├── images/          # 主题静态图片源文件
│   └── styles/          # base / content / auth / tailwind、共享外框 layout、文件列表 file-list
├── templates/
│   ├── assets/          # 编译产出目录
│   ├── layout.html       # Halo 插件前台页面布局契约
│   ├── modules/
│   │   ├── layout.html  # 主题内部布局（包含局部导航容器与终端）
│   │   └── file-list.html # 目录、文章行、空状态和分页片段
│   ├── gateway_fragments/ # 登录、注册、密码重置等网关片段
│   ├── index.html       # 首页模板
│   ├── post.html        # 文章详情页
│   ├── page.html        # 独立页面
│   ├── archives.html    # 归档页
│   ├── author.html      # 作者文章页
│   ├── categories.html  # 分类列表页
│   ├── category.html    # 分类详情页
│   ├── tags.html        # 标签列表页
│   └── tag.html         # 标签详情页
├── scripts/             # DOM 回归、插件契约、发布守卫与主题包验证
├── settings.yaml        # 主题设置项
└── theme.yaml           # 主题元数据配置
```

### 6. 组件适配说明

本主题以 Halo Core 为基础，并对实际使用的插件表面做显式兼容：

- ✅ **核心功能**：文章、独立页面、归档、作者、分类和标签路由。
- ✅ **公共页面布局**由 `templates/layout.html` 提供。支持 Halo `html(head, content)` 契约的插件页面可使用主题的终端配色、导航和页脚。
- ✅ **超链接卡片**：适配块级 `regular / small / grid` 与行内卡片的终端暗色变量。
- ⚠️ **搜索入口**：提供 `[SEARCH]` 按钮和 `search` 命令，调用官方搜索组件 `SearchWidget.open()`；搜索能力依赖站点安装并启用搜索插件。预览模式下，支持 Navigation API 的浏览器会为同源搜索结果保留 `preview-theme`；其他浏览器沿用插件原始跳转。
- ⚠️ **评论入口**：文章页可通过主题设置开启 `[COMMENTS]` 区块，调用 Halo `<halo:comment>` 扩展点；评论能力依赖站点安装并启用官方评论组件 `PluginCommentWidget`。局部导航会按插件约定重放显式 `script[type="module"][data-pjax]`（包含插件生成的内联初始化模块）。
- ✅ **评论 3.4–3.5 主题契约**：补齐主色按钮文字变量，支持评论/回复固定链接的 hash 通知与重复定位；编辑、私有回复、属地及通知等业务行为由插件提供。
- ⚠️ **Shiki**：支持 `shiki-code` 与 `extraPathPatterns` 的 `window.pjax:complete` 生命周期；页面元数据精确同步，Head 可执行脚本、外链资源或插件生命周期节点发生变化时自动降级为整页导航。未标记的内联 `<style>` 不参与 Head 生命周期比较；带 `data-theme-navigation-style` 的主题声明式样式仍纳入契约。
- ✅ **认证入口**支持 Halo Pro 原生 ALTCHA 验证码。Passkey 2.0.0 的直达页使用插件已有的登录入口，并显示插件返回的错误提示。
- ⚠️ **已有局部适配**包括 Vote 正文组件配色和 Lottery 的“活动不存在”空态。
- ❌ **组件适配**：目前**暂未适配**相册等第三方插件。

本版真页验收见 [1.3.0 兼容与验收记录](docs/upgrade-2026-09-24.md#latest-2026-11-18)。`pnpm verify:plugin-contracts` 使用 [2026-07 历史插件契约](docs/plugin-adaptation.md) 检查仓库的四项静态集成守卫。

## 📝 开源协议

MIT

## 💬 讨论

如果你对主题有什么建议或者意见，欢迎提 PR & Issue。

|                                                            企业微信（备注进群）                                                             |                                                 QQ群                                                  |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| <img width="200" src="https://api.minio.yyds.pink/kunkunyu/files/2025/02/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250212142105-pbceif.jpg" /> | <img width="200" src="https://api.minio.yyds.pink/kunkunyu/files/2025/05/qq-708998089-iqowsh.webp" /> |

> ⚠️ 卖服务器的广告人，就不要加了。

---
