<script setup>
import { computed, onMounted, ref } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { fetchArticles } from '@/api/articles'

const articles = ref([])
const loading = ref(true)
const error = ref('')

// 首页只展示最新的 3 篇
const latest = computed(() => articles.value.slice(0, 3))

const stats = computed(() => {
  const tagSet = new Set()
  articles.value.forEach((a) => a.tags.forEach((t) => tagSet.add(t)))
  return [
    { label: '文章', value: articles.value.length },
    { label: '标签', value: tagSet.size },
    { label: '分类', value: new Set(articles.value.map((a) => a.category)).size }
  ]
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
  <div>
    <HeroBanner
      title="记录我的编程学习之路"
      subtitle="这里存放我在 Java 后端与前端开发中的学习笔记、项目总结和踩坑记录。写作是最好的复习方式。"
      :stats="stats"
    />

    <section class="container">
      <div class="section-head">
        <h2 class="section-head__title">最新文章</h2>
        <RouterLink class="section-head__more" :to="{ name: 'articles' }">查看全部 →</RouterLink>
      </div>

      <p v-if="loading" class="state">正在加载文章…</p>

      <div v-else-if="error" class="state state--error">
        <p class="state__title">加载失败</p>
        <p>{{ error }}</p>
      </div>

      <div v-else-if="latest.length" class="article-grid">
        <ArticleCard v-for="item in latest" :key="item.id" :article="item" />
      </div>

      <p v-else class="state">还没有文章。</p>
    </section>
  </div>
</template>

<style scoped>
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.section-head__title { margin: 0; font-size: 22px; }

.section-head__more {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 600;
}
</style>
