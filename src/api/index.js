import axios from 'axios'

/**
 * 统一的 axios 实例
 * - baseURL 支持通过 .env 里的 VITE_API_BASE 覆盖，方便日后换成真实后端
 * - 请求 / 响应拦截器集中处理鉴权头与错误提示
 */
const request = axios.create({
  // 默认跟随 Vite 的 base 路径：GitHub Pages 下是 /my-blog/，Vercel 下是 /
  // 这样接口请求会自动带上正确的前缀，不需要每个调用点手写
  baseURL: import.meta.env.VITE_API_BASE || import.meta.env.BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器：统一加请求头（日后接入 JWT 时在这里加 Authorization）
request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// 响应拦截器：统一剥离外层结构 + 统一错误信息
request.interceptors.response.use(
  (response) => {
    const res = response.data
    // 约定后端返回 { code, message, data } 时自动取 data
    if (res && typeof res === 'object' && !Array.isArray(res) && 'code' in res) {
      if (res.code === 0 || res.code === 200) return res.data
      return Promise.reject(new Error(res.message || '接口返回异常'))
    }
    return res
  },
  (error) => {
    let message = '网络异常，请稍后重试'
    if (error.code === 'ECONNABORTED') {
      message = '请求超时，请检查网络后重试'
    } else if (error.response) {
      message = `请求失败（HTTP ${error.response.status}）`
    }
    return Promise.reject(new Error(message))
  }
)

export default request
