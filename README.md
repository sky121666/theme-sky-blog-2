# Sky Blog 2 Theme

Sky Blog 2 是一个基于 Halo 2.0 的现代博客主题，集成了 Vite、Tailwind CSS 和 Alpine.js 等现代前端技术栈。

## 特性

- ⚡️ **Vite** v7.3+: 极速的开发服务器和构建工具。
- 🎨 **Tailwind CSS** v4.1+: 实用优先的 CSS 框架，快速构建自定义设计。
- 📝 **Typography**: 使用 `@tailwindcss/typography` 优化文章阅读体验。
- 🧩 **Alpine.js** v3.15+: 轻量级 JavaScript 框架，提供交互功能。
- 🔍 **Iconify**: 丰富的图标库支持。
- 🛠 **Linting**: 集成 ESLint 和 Prettier，保持代码整洁。
- 📘 **TypeScript** v5.9+: 提供类型安全的开发体验。

## 环境要求

- Halo 2.0.0 或更高版本
- Node.js 18+ (用于开发)
- pnpm (用于开发)

## 开发指南

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发模式

启动 Vite 开发服务器，实时监听文件变化：

```bash
pnpm dev
```

### 3. 构建

构建生产环境代码：

```bash
pnpm build
```

该命令会执行 TypeScript 检查、Vite 构建以及打包主题文件。

## 配置说明

主题配置位于 `settings.yaml` 文件中，目前支持以下设置：

- **基础设置**
  - `welcome_message`: 欢迎语

## 许可证

[GPL-3.0](LICENSE)
