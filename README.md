# Theme Sky Blog 2 - 终端风格主题

> 🖥️ 一款为 Halo CMS 打造的复古终端风格主题，支持全键盘操作。

## ✨ 主要功能

### 🟢 沉浸式终端界面

整个博客模拟命令行终端操作体验，包含 CRT 视觉特效：

- 扫描线覆盖效果
- 文本荧光辉光
- 闪烁的光标
- 适配系统等宽字体栈

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

#### 键盘快捷键 (文章阅读模式)

> ⚠️ **注意**：使用键盘滚动前，请按 `Esc` 键或点击页面空白处，确保终端输入框**未被选中**。

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

- **Tab 自动补全**：输入命令或路径的前几个字母，按 `Tab` 键自动补全。
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
| 表格      | 绿色边框，鼠标悬停高亮                    |
| 图片      | 带有 `[ IMAGE ]` 标注框                   |
| 视频      | 带有 `▶ MEDIA PLAYER :: VIDEO` 播放器外观 |
| 音频      | 带有 `♪ MEDIA PLAYER :: AUDIO` 播放器外观 |
| 链接      | 虚线下划线，悬停反色效果                  |
| 高亮      | 反色显示 (绿底黑字)                       |

### 🔗 链接卡片 (Hyperlink Card)

完美适配 Halo 的链接卡片组件，自动继承终端主题：

- **常规卡片**：带有 `$ curl -I` 模拟请求头样式的顶部栏。
- **网格卡片**：极简边框风格。
- **行内卡片**：带有 `[链接]` 样式的方括号装饰。

全部组件支持深色模式，使用半透明背景和荧光绿边框。

## 🛠️ 开发指南

### 环境要求

- Halo `>=2.23.0`（与 `theme.yaml` 的主题运行要求一致）
- Node.js `^22.22.1 || ^24.0.0`（CI 使用 Node.js 22.22.1 与 Node.js 24；CD 使用 Node.js 24）
- pnpm 10.x（CI/CD 固定使用 pnpm 10.34.5）
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

构建完成后会生成用于发布的 `dist/theme-sky-blog-2-<version>.zip`。本地目录挂载式开发不通过控制台
“上传安装 / 升级”刷新已启用主题；修改 `theme.yaml` 或升级版本后，必须调用
`PUT /apis/api.console.halo.run/v1alpha1/themes/theme-sky-blog-2/reload` 重新载入主题元数据。
仅重启容器不会刷新已安装主题版本。

### 发布前检查

```bash
pnpm check
pnpm build
pnpm verify:package -- --strict-dist
pnpm audit --audit-level moderate
```

`pnpm test` 使用 Node 原生测试运行器快速执行完整回归，并通过源码清单防止可执行模块漏测；
`pnpm test:coverage` 在此基础上额外启用覆盖率门禁，全局要求行覆盖不低于 95%、分支覆盖不低于 85%、函数覆盖
不低于 95%，并要求 `alpine.ts`、
`navigation.ts`、`runtime.ts` 三个关键运行时文件的行、分支、函数覆盖率分别不低于 95%。测试覆盖 BFCache
解锁、导航竞态与失败回滚、终端命令/历史/补全、页面数据与虚拟路径、任务列表、文章工具、插件契约、模板语义和
发布包规则。`pnpm check` 默认执行上述门禁。正式发版的
`pnpm check:release` 还会拒绝任何已修改或未跟踪文件，确保标签对应完整、可追溯的主题快照。

严格制品验证同时限制核心 CSS 不超过 80 KiB、核心 JavaScript 不超过 128 KiB、主题 PNG 图标不超过
192 KiB、Figlet 字体合计不超过 320 KiB、压缩 ZIP 不超过 384 KiB；预算超限会直接阻止构建验收。

> `pnpm audit` 主要检查本地构建与打包链路依赖；如上游工具链短期仍有传递依赖告警，应在发布说明中记录剩余风险。
> CI/CD 的第三方 Actions 使用完整 commit SHA 固定。推送 `v*` tag 后，CD 绑定触发事件的原始提交，只构建并验证一次；ZIP 会统一时间、权限、条目顺序和扩展元数据以保证同一源码可复现。发布流程先在草稿 Release 中完整比对已有资产，再统一补齐缺失项，拒绝覆盖不同内容或修改已公开 Release，最后才公开；GitHub Release 与 Halo 应用市场复用同一份已验证产物。公开的 `SHA256SUMS` 使用裸 ZIP 文件名，可与下载到同一目录的 ZIP 直接校验。
> pnpm 版本由 CI/CD 固定为 10.34.5；不要在 `package.json` 中恢复 `packageManager`，避免产生第二个版本来源。

运行态资源版本可用以下只读检查确认：

```bash
pnpm check:runtime-version
```

如输出 `Runtime asset version mismatch`，说明 Halo 当前页面仍在引用旧版本资源，需要执行主题 Reload，
不需要上传 ZIP。

需要验证本地 Halo 实际返回的文件内容、浏览器无缓存加载、真实局部导航和 390px 布局时，运行只读 smoke：

```bash
HALO_BASE_URL=http://127.0.0.1:8090 pnpm smoke:live
```

该命令会使用临时 Chrome profile，通过 CDP 禁用浏览器缓存并绕过 Service Worker，对比线上 CSS/JS 与
`templates/assets` 的 SHA-256，并检查基础无障碍语义、稳定布局、横向溢出和网络资源预算；它不会调用 Reload
API，也不会修改 Halo 设置。`CHROME_PATH` 优先级最高；未指定时会依次尝试系统 Chrome/Chromium 与本机
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
│   ├── common/          # 原生局部导航、Head 元数据同步、任务列表、日志等共享运行时
│   ├── features/        # 终端命令、文章工具、自动补全、打字机等交互功能
│   ├── images/          # 主题静态图片源文件
│   └── styles/          # base / content / auth / tailwind 分层样式
├── templates/
│   ├── assets/          # 编译产出目录
│   ├── modules/
│   │   └── layout.html  # 全局布局（包含局部导航容器与终端）
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
- ✅ **超链接卡片**：适配块级 `regular / small / grid` 与行内卡片的终端暗色变量。
- ⚠️ **搜索入口**：提供 `[SEARCH]` 按钮和 `search` 命令，调用官方搜索组件 `SearchWidget.open()`；搜索能力依赖站点安装并启用搜索插件。
- ⚠️ **评论入口**：文章页可通过主题设置开启 `[COMMENTS]` 区块，调用 Halo `<halo:comment>` 扩展点；评论能力依赖站点安装并启用官方评论组件 `PluginCommentWidget`。原生局部导航会按插件约定重放显式 `script[type="module"][data-pjax]`（包含插件生成的内联初始化模块）。
- ⚠️ **Shiki**：支持 `shiki-code` 与 `extraPathPatterns` 的 `window.pjax:complete` 生命周期；页面元数据精确同步，Head 可执行脚本、外链资源或插件生命周期节点发生变化时自动降级为整页导航。未标记的内联 `<style>` 不参与 Head 生命周期比较；带 `data-theme-navigation-style` 的主题声明式样式仍纳入契约。
- ❌ **组件适配**：目前**暂未适配**相册等第三方插件。

插件的安装版本、源码基线、主题契约版本和真页测试版本以 [主题本地插件兼容契约](docs/plugin-adaptation.md) 为唯一真值，可运行 `pnpm verify:plugin-contracts` 做静态验证。

## 📝 开源协议

MIT

## 💬 讨论

如果你对主题有什么建议或者意见，欢迎提 PR & Issue。

|                                                            企业微信（备注进群）                                                             |                                                 QQ群                                                  |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| <img width="200" src="https://api.minio.yyds.pink/kunkunyu/files/2025/02/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250212142105-pbceif.jpg" /> | <img width="200" src="https://api.minio.yyds.pink/kunkunyu/files/2025/05/qq-708998089-iqowsh.webp" /> |

> ⚠️ 卖服务器的广告人，就不要加了。

---
