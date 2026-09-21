import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 部署在子路径（/my-blog/），Vercel 部署在根路径。
// 用环境变量区分，本地和 Vercel 默认走 '/'。
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [vue()],
  resolve: {
    // 用 @ 指向 src 目录，导入时不用写一堆 ../../
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
