<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetchArticleById, fetchArticles } from '@/api/articles'

const props = defineProps({
  id: { type: [String, Number], required: true }
})

const router = useRouter()
const article = ref(null)
const related = ref([])
const loading = ref(true)
const error = ref('')

function formatDate(value) {
  const d = new Date(value)
  return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
}

const publishedAt = computed(() => (article.value ? formatDate(article.value.date) : ''))

async function load(id) {
  loading.value = true
  error.value = ''
  article.value = null
  related.value = []
  try {
    article.value = await fetchArticleById(id)
    const all = await fetchArticles()
    // 相关阅读：优先取同标签的文章，数量不足时用同分类补齐
    const others = all.filter((a) => String(a.id) !== String(id))
    const byTag = others.filter((a) => a.tags.some((t) => article.value.tags.includes(t)))
    const byCategory = others.filter(
      (a) => a.category === article.value.category && !byTag.includes(a)
    )
    related.value = [...byTag, ...byCategory].slice(0, 3)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// 从一篇详情跳到另一篇时，组件被复用，需要监听 id 变化
watch(() => props.id, (next) => load(next), { immediate: true })
</script>

<template>
  <div class="container">
    <button class="back" type="button" @click="router.back()">← 返回</button>

    <p v-if="loading" class="state">正在加载文章…</p>

    <div v-else-if="error" class="state state--error">
      <p class="state__title">{{ error }}</p>
      <RouterLink class="btn btn--primary" :to="{ name: 'articles' }">回到文章列表</RouterLink>
    </div>

    <article v-else-if="article" class="post">
      <header class="post__header">
        <div class="post__tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        <h1 class="post__title">{{ article.title }}</h1>
        <p class="post__meta">
          <time :datetime="article.date">{{ publishedAt }}</time>
          <span class="post__dot">·</span>
          <span>{{ article.category }}</span>
          <span class="post__dot">·</span>
          <span>{{ article.readingTime }} 分钟阅读</span>
        </p>
      </header>

      <div class="post__body">
        <template v-for="(block, index) in article.content" :key="index">
          <h2 v-if="block.type === 'h2'" class="post__h2">{{ block.text }}</h2>

          <p v-else-if="block.type === 'p'" class="post__p">{{ block.text }}</p>

          <ul v-else-if="block.type === 'ul'" class="post__ul">
            <li v-for="(it, i) in block.items" :key="i">{{ it }}</li>
          </ul>

          <pre v-else-if="block.type === 'code'" class="post__code"><code>{{ block.text }}</code></pre>
        </template>
      </div>

      <section v-if="related.length" class="related">
        <h2 class="related__title">相关阅读</h2>
        <ul class="related__list">
          <li v-for="item in related" :key="item.id">
            <RouterLink :to="{ name: 'article-detail', params: { id: item.id } }">
              {{ item.title }}
            </RouterLink>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<style scoped>
.back {
  display: inline-flex;
  align-items: center;
  padding: 7px 14px;
  margin-bottom: 22px;
  font-size: 14px;
  color: var(--color-text-muted);
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
}

.back:hover { color: var(--color-primary); border-color: var(--color-primary-soft-border); }

.post {
  max-width: 760px;
  padding: 36px 40px 40px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.post__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }

.post__title { margin: 0 0 14px; font-size: 30px; line-height: 1.4; }

.post__meta { margin: 0; font-size: 13.5px; color: var(--color-text-muted); }
.post__dot { margin: 0 7px; }

.post__body { margin-top: 30px; }

.post__h2 {
  margin: 34px 0 12px;
  padding-left: 12px;
  font-size: 19px;
  border-left: 3px solid var(--color-primary);
}

.post__p { margin: 0 0 16px; font-size: 15.5px; line-height: 1.9; }

.post__ul { margin: 0 0 16px; padding-left: 22px; }
.post__ul li { margin-bottom: 8px; font-size: 15.5px; line-height: 1.85; }

.post__code {
  margin: 0 0 18px;
  padding: 16px 18px;
  overflow-x: auto;
  font-size: 13.5px;
  line-height: 1.7;
  color: #e6edf3;
  background: #1e2533;
  border-radius: 10px;
}

.post__code code { font-family: 'JetBrains Mono', Consolas, Monaco, monospace; }

.related {
  margin-top: 40px;
  padding-top: 26px;
  border-top: 1px solid var(--color-border);
}

.related__title { margin: 0 0 14px; font-size: 17px; }
.related__list { margin: 0; padding-left: 20px; }
.related__list li { margin-bottom: 10px; font-size: 15px; }
.related__list a:hover { color: var(--color-primary); }

@media (max-width: 640px) {
  .post { padding: 24px 20px 28px; }
  .post__title { font-size: 23px; }
  .post__p, .post__ul li { font-size: 15px; }
}
</style>
