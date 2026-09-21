import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 部署在子路径（/my-blog/），Vercel 部署在根路径。
// 用环境变量区分，本地和 Vercel 默认走 '/'。
const base = process.env.VITE_BASE_PATH || '/'

// 构建时写入一个唯一 ID。数据文件的请求地址会带上它，
// 这样每次发布浏览器都会拉到新数据，同一次发布内仍然正常走缓存。
const BUILD_ID = Date.now().toString()

export default defineConfig({
  base,
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID)
  },
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
