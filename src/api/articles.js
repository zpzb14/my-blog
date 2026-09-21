import request from './index'

/**
 * 文章相关接口
 * 数据源是 public/data/articles.json，接入真实后端时只改这里的地址即可。
 *
 * 关于 ?v=__BUILD_ID__：
 * GitHub Pages 默认给静态文件加 Cache-Control: max-age=600，
 * 浏览器会把数据缓存 10 分钟，导致发版后用户仍看到旧内容。
 * 带上构建 ID 后，每次发布的 URL 都不同，浏览器必然重新拉取；
 * 同一次发布内 URL 不变，仍然正常命中缓存。
 */

export function fetchArticles() {
  return request.get('/data/articles.json?v=' + __BUILD_ID__)
}

export async function fetchArticleById(id) {
  const list = await fetchArticles()
  const article = list.find((item) => String(item.id) === String(id))
  if (!article) {
    throw new Error('文章不存在或已被删除')
  }
  return article
}
