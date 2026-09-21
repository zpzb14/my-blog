import { createRouter, createWebHistory } from 'vue-router'

/**
 * 路由表：五个页面
 * 除首页外全部使用路由懒加载，首屏体积更小
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('@/views/ListView.vue'),
    meta: { title: '全部文章' }
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    component: () => import('@/views/DetailView.vue'),
    props: true,
    meta: { title: '文章详情' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于我' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  // 必须传入 import.meta.env.BASE_URL：
  // GitHub Pages 部署在 /my-blog/ 子路径下，Vercel 部署在根路径，
  // Vite 会把 vite.config.js 里的 base 注入到 BASE_URL，这里自动适配。
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 切换路由时回到页面顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

// 根据路由 meta 动态设置浏览器标签页标题
router.afterEach((to) => {
  const base = '陈泓任的技术博客'
  document.title = to.meta?.title ? `${to.meta.title} | ${base}` : base
})

export default router
