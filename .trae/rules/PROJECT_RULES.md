# 项目规范文档

本文档定义了 `theme-sky-blog-2` 项目的开发规范、技术栈和最佳实践。

## 1. 技术栈概览

- **构建工具**: Vite v7.3+
- **CSS 框架**: Tailwind CSS v4.1+
- **JavaScript 框架**: Alpine.js v3.15+
- **语言**: TypeScript v5.9+
- **页面交互**: Pjax (无刷新跳转) + NProgress (进度条)
- **性能优化**: Lozad.js (图片懒加载)
- **代码规范**: ESLint + Prettier

## 2. 目录结构规范

```
theme-sky-blog-2/
├── src/                # 源码目录
│   ├── main.ts         # 入口文件 (引入样式、初始化插件)
│   ├── styles/         # 样式文件
│   │   ├── main.css    # 全局自定义样式 & 动画
│   │   └── tailwind.css# Tailwind 入口
│   └── vite-env.d.ts   # 类型声明
├── templates/          # Halo 主题模板 (Thymeleaf)
│   ├── assets/         # 编译产出目录 (Git 需提交)
│   ├── modules/        # 页面组件/片段
│   │   └── layout.html # 全局布局 (包含 Pjax 容器 #main)
│   ├── index.html      # 首页模板
│   └── post.html       # 文章页模板
├── theme.yaml          # 主题元数据配置
├── settings.yaml       # 主题后台配置项
└── package.json        # 依赖管理
```

## 3. 开发规范

### 3.1 命名规范
- **文件/文件夹**: 使用 `kebab-case` (如 `post-card.html`, `user-profile/`)。
- **CSS 类名**: 优先使用 Tailwind Utility Class。自定义类使用 `kebab-case`。
- **JS 变量/函数**: 使用 `camelCase`。
- **TS 接口/类型**: 使用 `PascalCase` (如 `DemoStore`)。

### 3.2 交互开发 (Pjax 适配)
由于项目使用了 Pjax，编写 JS 逻辑时需注意：
1. **DOM 事件**: 不要在具体的元素上绑定一次性事件，尽量使用**事件委托**。
2. **初始化逻辑**: 必须在 `src/main.ts` 的 `pjax:complete` 事件中重新初始化插件（如 Alpine, Lozad, Highlight.js 等）。
   ```typescript
   document.addEventListener("pjax:complete", () => {
     // 重新初始化逻辑
     Alpine.initTree(document.getElementById("main"));
     observer.observe();
   });
   ```
3. **全局状态**: 尽量使用 Alpine.store 管理状态，避免污染全局 window 对象。

### 3.3 样式开发
- 优先使用 Tailwind CSS 类。
- 复杂的自定义动画或组件样式写在 `src/styles/main.css` 中。
- 响应式设计：必须适配移动端，使用 Tailwind 的 `md:`, `lg:` 等前缀。

### 3.4 模板开发 (Thymeleaf)
- **布局**: 所有页面应继承或包含 `layout.html`。
- **Pjax 容器**: 主要内容必须包裹在 `<div id="main">` 中，否则 Pjax 无法更新。
- **静态资源**: 引用资源时使用 Halo 的资源标签，并带上版本号：
  ```html
  <link th:href="@{/assets/main.css?v={version}(version=${theme.spec.version})}" />
  ```

### 3.5 懒加载
- 图片标签必须添加 `lozad` 类，并将 `src` 替换为 `data-src`：
  ```html
  <img class="lozad" data-src="${post.thumbnail}" alt="缩略图" />
  ```

## 4. Git 提交规范

遵循 Conventional Commits 规范：
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档变更
- `style`: 代码格式调整（不影响逻辑）
- `refactor`: 代码重构
- `chore`: 构建过程或辅助工具的变动

示例: `feat: 集成 NProgress 进度条`

## 5. 版本发布

1. 更新 `package.json` 版本号。
2. 更新 `theme.yaml` 版本号。
3. 执行 `pnpm build` 生成最新资源。
4. 提交所有更改（包括 `templates/assets/`）。
