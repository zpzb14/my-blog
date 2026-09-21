# 个人博客网站

一个基于 **Vue 3 + Vite** 的前后端分离风格个人博客前端项目，用于记录编程学习笔记。
数据层目前读取静态 JSON（`public/data/articles.json`），接入真实后端时只需替换 `src/api` 中的接口地址。

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | Vue 3（组合式 API / `<script setup>`） |
| 构建 | Vite |
| 路由 | Vue Router 4（含路由懒加载、动态标题、404 兜底） |
| 请求 | Axios（实例封装 + 请求/响应拦截器 + 统一错误处理） |
| 样式 | 原生 CSS（CSS 变量、Flex、Grid、媒体查询） |

## 功能

- 首页：Hero 区 + 数据统计 + 最新文章
- 文章列表：标签筛选、关键词搜索、分页（筛选条件同步到 URL，刷新不丢）
- 文章详情：按内容块类型渲染段落 / 二级标题 / 列表 / 代码块，附「相关阅读」
- 关于我：技能分组、经历时间线、联系方式
- 404 页面
- 完整响应式：375px ~ 1920px，移动端导航折叠为下拉菜单
- 加载态 / 错误态 / 空状态都有显式处理

## 目录结构

```
src/
├── api/                 # Axios 实例与接口封装
│   ├── index.js         # 实例 + 拦截器
│   └── articles.js      # 文章接口
├── assets/styles/       # 全局样式与设计变量
├── components/          # 可复用组件（6 个）
│   ├── NavBar.vue
│   ├── HeroBanner.vue
│   ├── ArticleCard.vue
│   ├── TagFilter.vue
│   ├── Pagination.vue
│   └── FooterBar.vue
├── router/index.js      # 路由表
├── views/               # 页面级组件（5 个）
│   ├── HomeView.vue
│   ├── ListView.vue
│   ├── DetailView.vue
│   ├── AboutView.vue
│   └── NotFoundView.vue
├── App.vue
└── main.js
```

## 本地运行

```bash
pnpm install     # 安装依赖
pnpm dev         # 启动开发服务器，默认 http://localhost:5173
pnpm build       # 打包到 dist/
pnpm preview     # 本地预览打包结果
```

## 开发笔记

- **组件拆分**：把导航栏、Hero、文章卡片、标签筛选、分页、页脚拆成独立组件，
  页面只负责组织数据与布局，组件只关心自己的展示与交互。
- **请求封装**：所有接口调用走统一 axios 实例，错误信息在拦截器里统一转成中文提示，
  组件里只处理 loading / error / data 三种状态。
- **响应式**：文章网格用 `grid-template-columns` 配合媒体查询，桌面 3 列、平板 2 列、手机 1 列。
- **URL 即状态**：列表页的标签、关键词、页码都同步到 query，用户分享链接或刷新都能保持原状态。

## 测试

项目带一个端到端冒烟测试，用真实浏览器验证主要页面与交互：

```bash
pnpm add -D playwright      # 首次需要安装
pnpm build
pnpm preview                # 另开一个终端
node tests/smoke-test.cjs
```

覆盖范围：首页渲染、列表分页、标签筛选（含 URL 同步）、关键词搜索、
详情页代码块、404 兜底、关于页，以及 375 / 768 / 1440 三档宽度下的横向溢出检查。
默认复用系统已安装的 Edge，不额外下载 Chromium。
