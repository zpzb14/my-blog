import request from './index'

/**
 * 文章相关接口
 * 目前读取 public/data/articles.json（不依赖后端即可跑通），
 * 日后把 URL 换成真实接口地址即可，组件层不用改。
 */

export function fetchArticles() {
  return request.get('/data/articles.json')
}

export async function fetchArticleById(id) {
  const list = await fetchArticles()
  const article = list.find((item) => String(item.id) === String(id))
  if (!article) {
    throw new Error('文章不存在或已被删除')
  }
  return article
}
