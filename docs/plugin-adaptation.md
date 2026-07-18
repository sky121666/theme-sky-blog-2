# 主题本地插件兼容契约

本文档是 Sky Blog 2 的插件兼容矩阵唯一版本真值。验证器从本矩阵读取版本并检查运行态、矩阵与证据账本的内部一致性，不再复制一套硬编码版本。它记录主题实际依赖的插件表面，并严格区分以下四类版本：

- `Installed version`：本次运行环境里安装且启用的版本。
- `Shared source baseline`：全局 `halo-plugin-*` source skill 当前维护的源码基线；没有对应 skill 时必须写 `unavailable`。
- `Contract version`：本主题实现时所依据的本地兼容契约版本，不跟随“最新版本”自动变化。
- `Tested version`：已在真页完成对应表面验证的版本；未完成真页验证时必须留空为 `—`。

`Latest verified upstream` 只是指定日期的上游审计快照，不是主题契约，也不能作为已测试结论。

## Version context

| Key                | Value        | Evidence                                              |
| ------------------ | ------------ | ----------------------------------------------------- |
| snapshotDate       | `2026-07-17` | 本地 Halo、应用市场和共享 source skill 的同日审计快照 |
| runtimeTarget      | `local Halo` | 当前主题真页验证环境                                  |
| runtimeHaloVersion | `2.25.4`     | 本地 Halo 运行态                                      |
| themeHaloRequires  | `>=2.23.0`   | `theme.yaml` 的主题核心最低版本                       |
| shikiHaloRequires  | `>=2.25.0`   | `plugin-shiki` 1.4.1 的插件运行最低版本               |

`plugin-shiki` 是可选插件。它的 `>=2.25.0` 只约束启用该插件的 Halo 运行环境，不会把主题核心最低版本从 `>=2.23.0` 抬高。

## Runtime inventory

| Plugin                  | Runtime ID              | Installed version | State   | Evidence                                                   |
| ----------------------- | ----------------------- | ----------------- | ------- | ---------------------------------------------------------- |
| `PluginSearchWidget`    | `PluginSearchWidget`    | `1.7.1`           | started | 本地 Halo 插件运行态                                       |
| `PluginCommentWidget`   | `PluginCommentWidget`   | `3.1.2`           | started | 本地 Halo 插件运行态；临时开启真页测试后已恢复评论开关原值 |
| `plugin-shiki`          | `shiki`                 | `1.4.1`           | started | 本地 Halo 插件运行态；代码文章真页样本已验证               |
| `editor-hyperlink-card` | `editor-hyperlink-card` | `1.9.2`           | started | 本地 Halo 插件运行态                                       |

## Compatibility matrix

允许的 `Status` 值为 `confirmed`、`compatible-tested`、`inferred`、`unconfirmed`、`not-adapted`。只有与插件、版本和表面相匹配的真页 `pass` 证据，才能把状态提升为 `confirmed` 或 `compatible-tested`。

| Plugin                  | Surface                                                                                        | Installed version | Shared source baseline | Latest verified upstream | Contract version | Tested version | Status      | Evidence                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------- | ----------------- | ---------------------- | ------------------------ | ---------------- | -------------- | ----------- | --------------------------------------------------------- |
| `PluginSearchWidget`    | 页脚语义化搜索入口与 `SearchWidget.open()` 弹窗                                                | `1.7.1`           | `1.7.1`                | `1.7.1`                  | `1.7.1`          | `1.7.1`        | `confirmed` | `live-search-2026-07-18`, `static-contract-2026-07-18`    |
| `PluginCommentWidget`   | Post guard、`<halo:comment>` 资源标识、局部导航契约判定与完整导航退化、`<comment-widget>` 渲染 | `3.1.2`           | `3.1.2`                | `3.1.2`                  | `3.1.2`          | `3.1.2`        | `confirmed` | `live-comment-2026-07-18`, `static-contract-2026-07-18`   |
| `plugin-shiki`          | Post 的 `shiki-code` 自定义元素与 Shadow DOM 高亮渲染                                          | `1.4.1`           | `1.4.1`                | `1.4.1`                  | `1.4.1`          | `1.4.1`        | `confirmed` | `live-shiki-2026-07-18`, `static-contract-2026-07-18`     |
| `editor-hyperlink-card` | 文章页 3 种块卡片与 1 个行内卡片 DOM 渲染                                                      | `1.9.2`           | `unavailable`          | `1.9.2`                  | `1.9.2`          | `1.9.2`        | `confirmed` | `live-hyperlink-2026-07-18`, `static-contract-2026-07-18` |

`editor-hyperlink-card` 当前没有对应的共享 source skill，因此 `Shared source baseline` 明确记录为 `unavailable`；上游审计版本不能回填到该字段。

## Static-only / live-not-run surfaces

以下表面保留静态守卫，但没有混入上表的 `confirmed` 真页范围：

`Surface IDs` 是静态契约验证器读取的机器真值，必须与源码守卫一一对应；自然语言描述只用于解释范围，不能替代或扩张这些 ID。

| Plugin                  | Static-only surface                                                                                | Surface IDs                                                                                                   | State                         |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `PluginSearchWidget`    | 终端 `search` 命令与搜索 CSS 变量                                                                  | `terminal-search-command`, `search-css-variables`                                                             | static-guarded / live-not-run |
| `PluginCommentWidget`   | SinglePage guard / 资源标识、评论 CSS 变量与 `data-pjax` 内联模块重放                              | `single-page-comment-guard`, `comment-resource-identity`, `comment-css-variables`, `comment-data-pjax-replay` | static-guarded / live-not-run |
| `plugin-shiki`          | `extraPathPatterns` 的 window `pjax:complete` 事件、完整 head 生命周期边界与可选插件最低 Halo 版本 | `shiki-extra-path-event`, `head-lifecycle-boundary`, `shiki-minimum-halo-version`                             | static-guarded / live-not-run |
| `editor-hyperlink-card` | 官方链接卡片 CSS 变量                                                                              | `hyperlink-card-css-variables`                                                                                | static-guarded / live-not-run |

`PluginCommentWidget 3.1.2` 的 `<halo:comment>` 输出包含显式 opt-in 的内联 `<script type="module" data-pjax>`，模块负责导入 `comment-widget.js` 并对当前内容标识调用 `init()`。主题的原生局部导航必须重放该内联模块，并通过模块执行完成信号等待 `init()` 调用结束，不能依赖内联 module 不稳定的 `load` 事件而固定等待超时；带 `src` 的 opt-in 模块只允许同源 HTTP(S) 地址，并使用逐次导航标识绕过浏览器 module map 的单次求值限制。当前真页从首页进入测试文章时先发出局部导航 Fetch，随后因目标 Head 插件生命周期契约不同而正确退化为整页 Document；因此本轮真页证据确认的是契约判定、整页退化和组件渲染，内联模块重放仍只记为静态守卫表面。

`plugin-shiki 1.4.1` 的普通 Post / SinglePage 会由服务端输出 `shiki-code`；它的 `extraPathPatterns` 客户端渲染器位于 `<head>`，通过 `window` 监听 `pjax:complete`。主题不恢复 Pjax 依赖：当前页与目标页除 title、SEO meta、canonical / alternate / prev / next、JSON-LD 及未标记内联 `<style>` 外的可执行与外链资源契约一致时，在原生局部导航替换和模块重放完成后向 `window` 派发兼容事件；页面元数据按目标响应精确替换，可执行脚本、外链资源或扩展生命周期节点一旦新增、移除或变化就改用整页导航，让浏览器完整创建或释放页面生命周期。未标记的内联 `<style>` 不参与 Head 生命周期比较；带 `data-theme-navigation-style` 的主题声明式样式仍纳入契约，并在变化时触发整页导航。当前环境没有配置 extra path 真页样本，所以该表面仍明确记为 `live-not-run`。

## Halo core surfaces

以下能力来自 Halo Core，不单独伪装成插件版本行：

| Surface                                  | Provider                          | Theme constraint | Static contract                                  |
| ---------------------------------------- | --------------------------------- | ---------------- | ------------------------------------------------ |
| `<halo:footer />`                        | Halo Core                         | `>=2.23.0`       | 布局模板保留官方 footer 注入点                   |
| `haloCommentEnabled` 与 `<halo:comment>` | Halo Core + Comment Widget 集成点 | `>=2.23.0`       | Post / SinglePage 同时校验开关、可用性和资源标识 |
| 分类、标签、贡献者 Finder 与内容 API     | Halo Core                         | `>=2.23.0`       | 由主题核心更新验证覆盖，不归入插件矩阵           |

## Verification ledger

后续真页补测应追加新的证据行；只有 `Evidence type=live-page`、`Result=pass` 且 `Environment` 不是 `repository`，同时 `Plugin`、`Version`、`Scope` 与矩阵表面相符时，才同步更新矩阵的 `Tested version` 和 `Status`。`not-run`、静态检查或仅安装成功都不能替代真页结论。

| Evidence ID                  | Date         | Environment                      | Plugin                  | Version                   | Result | Scope                                                                                                                                              | Notes                                                                        | Evidence type       |
| ---------------------------- | ------------ | -------------------------------- | ----------------------- | ------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------- |
| `live-search-2026-07-17`     | `2026-07-17` | local Halo 2.25.4                | `PluginSearchWidget`    | `1.7.1`                   | `pass` | 页脚搜索按钮渲染并打开搜索弹窗                                                                                                                     | 真页交互通过                                                                 | `live-page`         |
| `live-hyperlink-2026-07-17`  | `2026-07-17` | local Halo 2.25.4                | `editor-hyperlink-card` | `1.9.2`                   | `pass` | 文章页 3 个块卡片和 1 个行内卡片渲染                                                                                                               | 真页 DOM 与样式通过                                                          | `live-page`         |
| `live-comment-2026-07-17`    | `2026-07-17` | local Halo 2.25.4                | `PluginCommentWidget`   | `3.1.2`                   | `pass` | 首页局部导航进入文章、内联模块执行完成、`<comment-widget>` 懒加载渲染与页面就绪时序                                                                | 临时开启评论后真页通过；`page-ready` 约 167 ms；已恢复 `show_comments=false` | `live-page`         |
| `live-shiki-2026-07-17`      | `2026-07-17` | local Halo 2.25.4                | `plugin-shiki`          | `1.4.1`                   | `pass` | 局部导航进入代码文章后 `shiki-code` 自定义元素、Shadow DOM 高亮、语言标题与代码内容渲染                                                            | 真页识别 26 个 `shiki-code`，高亮输出通过                                    | `live-page`         |
| `live-search-2026-07-18`     | `2026-07-18` | local Halo 2.25.4 / theme 1.2.11 | `PluginSearchWidget`    | `1.7.1`                   | `pass` | 页脚搜索按钮渲染，搜索弹窗打开/关闭，Escape 后焦点恢复至 `[SEARCH]` 按钮                                                                           | 前台资源为 `v=1.2.11`；无脚本异常                                            | `live-page`         |
| `live-hyperlink-2026-07-18`  | `2026-07-18` | local Halo 2.25.4 / theme 1.2.11 | `editor-hyperlink-card` | `1.9.2`                   | `pass` | 文章页 3 个块卡片和 1 个行内卡片在 390 px 视口全部可见                                                                                             | 页面、main 均无横向溢出；无脚本异常                                          | `live-page`         |
| `live-comment-2026-07-18`    | `2026-07-18` | local Halo 2.25.4 / theme 1.2.11 | `PluginCommentWidget`   | `3.1.2`                   | `pass` | 首页点击文章先发起局部导航 Fetch；Head 生命周期差异触发完整 Document 退化，滚动入视口后 `<comment-widget>` 建立 Shadow DOM 并渲染                  | 临时开启真页测试后已恢复 `show_comments=false`；无脚本异常                   | `live-page`         |
| `live-shiki-2026-07-18`      | `2026-07-18` | local Halo 2.25.4 / theme 1.2.11 | `plugin-shiki`          | `1.4.1`                   | `pass` | 代码文章 26 个 `shiki-code` 均建立可见 Shadow DOM；390 px 下页面无横向溢出                                                                         | 主题容器与代码组件均未越出视口；无脚本异常                                   | `live-page`         |
| `static-contract-2026-07-18` | `2026-07-18` | repository                       | all listed surfaces     | `theme.yaml spec.version` | `pass` | 模板 guard / tag、`SearchWidget.open()`、CSS DOM / 变量、`data-pjax` 重放、完整 head 边界、页面元数据同步、BFCache 解锁、Halo / Shiki 最低版本条件 | `node scripts/plugin-contracts.mjs`、DOM 回归与 Node 测试通过                | `repository-static` |

## Static validation

运行：

```bash
node scripts/plugin-contracts.mjs
node --test scripts/plugin-contracts.test.mjs
```

验证器只证明仓库内契约仍存在，不会把静态通过自动解释为插件真页兼容。新增插件版本时，应按以下顺序更新：安装态证据 → source 基线审计 → 本地契约审查 → 真页测试 → `Tested version` / `Status`。
