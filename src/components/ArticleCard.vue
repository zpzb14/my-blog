<script setup>
defineProps({
  article: { type: Object, required: true }
})

function formatDate(value) {
  const d = new Date(value)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<template>
  <article class="card">
    <RouterLink class="card__link" :to="{ name: 'article-detail', params: { id: article.id } }">
      <div class="card__cover" :style="{ background: article.cover }">
        <span class="card__cover-text">{{ article.category }}</span>
      </div>

      <div class="card__body">
        <div class="card__meta">
          <time :datetime="article.date">{{ formatDate(article.date) }}</time>
          <span class="card__dot">·</span>
          <span>{{ article.readingTime }} 分钟阅读</span>
        </div>

        <h3 class="card__title">{{ article.title }}</h3>
        <p class="card__summary">{{ article.summary }}</p>

        <ul class="card__tags">
          <li v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</li>
        </ul>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.card {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-soft-border);
}

.card__link { display: block; height: 100%; }

.card__cover {
  height: 132px;
  display: flex;
  align-items: flex-end;
  padding: 14px 18px;
}

.card__cover-text {
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  background: rgba(0, 0, 0, 0.22);
  padding: 4px 10px;
  border-radius: 999px;
}

.card__body { padding: 18px 20px 20px; }

.card__meta {
  font-size: 12.5px;
  color: var(--color-text-muted);
  margin-bottom: 10px;
}

.card__dot { margin: 0 6px; }

.card__title {
  margin: 0 0 10px;
  font-size: 17px;
  line-height: 1.5;
  color: var(--color-text);
}

.card__summary {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 480px) {
  .card__cover { height: 112px; }
  .card__title { font-size: 16px; }
}
</style>
