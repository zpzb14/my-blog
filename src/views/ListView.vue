<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '@/components/ArticleCard.vue'
import TagFilter from '@/components/TagFilter.vue'
import Pagination from '@/components/Pagination.vue'
import { fetchArticles } from '@/api/articles'

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 6

const articles = ref([])
const loading = ref(true)
const error = ref('')

// 筛选条件：从 URL query 初始化，刷新后状态不丢
const activeTag = ref(route.query.tag ? String(route.query.tag) : '')
const keyword = ref(route.query.q ? String(route.query.q) : '')
const page = ref(Number(route.query.page) > 0 ? Number(route.query.page) : 1)

// 所有标签及每个标签下的文章数
const tags = computed(() => {
  const map = new Map()
  articles.value.forEach((a) => a.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1)))
  return [...map.keys()]
})

const counts = computed(() => {
  const map = { __all: articles.value.length }
  articles.value.forEach((a) => a.tags.forEach((t) => { map[t] = (map[t] || 0) + 1 }))
  return map
})

// 先按标签和关键词过滤，再分页
const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return articles.value.filter((a) => {
    const matchTag = !activeTag.value || a.tags.includes(activeTag.value)
    const matchKw = !kw
      || a.title.toLowerCase().includes(kw)
      || a.summary.toLowerCase().includes(kw)
    return matchTag && matchKw
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))

const paged = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})

// 筛选条件变化时回到第一页，并同步到 URL
watch([activeTag, keyword], () => { page.value = 1 })

watch([activeTag, keyword, page], () => {
  router.replace({
    name: 'articles',
    query: {
      ...(activeTag.value ? { tag: activeTag.value } : {}),
      ...(keyword.value ? { q: keyword.value } : {}),
      ...(page.value > 1 ? { page: String(page.value) } : {})
    }
  })
})

onMounted(async () => {
  try {
    articles.value = await fetchArticles()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container">
    <h1 class="page-title">全部文章</h1>
    <p class="page-desc">共 {{ articles.length }} 篇文章，可以按标签筛选或直接搜索标题。</p>

    <input
      v-model="keyword"
      class="search"
      type="search"
      placeholder="搜索文章标题或摘要…"
      aria-label="搜索文章"
    />

    <TagFilter v-model="activeTag" :tags="tags" :counts="counts" />

    <p v-if="loading" class="state">正在加载文章…</p>

    <div v-else-if="error" class="state state--error">
      <p class="state__title">加载失败</p>
      <p>{{ error }}</p>
    </div>

    <template v-else>
      <p v-if="!filtered.length" class="state">
        <span class="state__title">没有匹配的文章</span>
        换一个标签或关键词试试。
      </p>

      <div v-else class="article-grid">
        <ArticleCard v-for="item in paged" :key="item.id" :article="item" />
      </div>

      <Pagination :page="page" :total-pages="totalPages" @change="(p) => (page = p)" />
    </template>
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  max-width: 420px;
  padding: 10px 14px;
  margin-bottom: 18px;
  font-size: 14.5px;
  font-family: inherit;
  color: var(--color-text);
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}
</style>
