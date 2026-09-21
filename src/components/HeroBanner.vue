<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  stats: { type: Array, default: () => [] }
})
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__text">
        <h1 class="hero__title">{{ title }}</h1>
        <p v-if="subtitle" class="hero__subtitle">{{ subtitle }}</p>
        <div class="hero__actions">
          <RouterLink class="btn btn--primary" :to="{ name: 'articles' }">浏览全部文章</RouterLink>
          <RouterLink class="btn btn--ghost" :to="{ name: 'about' }">关于我</RouterLink>
        </div>
      </div>

      <dl v-if="stats.length" class="hero__stats">
        <div v-for="item in stats" :key="item.label" class="hero__stat">
          <dt class="hero__stat-label">{{ item.label }}</dt>
          <dd class="hero__stat-value">{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--color-hero-from) 0%, var(--color-hero-to) 60%, var(--color-hero-from) 100%);
  border-bottom: 1px solid var(--color-border);
}

.hero__inner {
  max-width: var(--layout-max);
  margin: 0 auto;
  padding: 64px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.hero__text { max-width: 560px; }

.hero__title {
  margin: 0 0 16px;
  font-size: 38px;
  line-height: 1.25;
  letter-spacing: -0.5px;
}

.hero__subtitle {
  margin: 0 0 28px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text-muted);
}

.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }

.hero__stats {
  display: flex;
  gap: 32px;
  margin: 0;
  padding: 28px 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.hero__stat { text-align: center; }

.hero__stat-label {
  font-size: 13px;
  color: var(--color-text-muted);
  margin-bottom: 6px;
}

.hero__stat-value {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: var(--color-primary);
}

@media (max-width: 900px) {
  .hero__inner { flex-direction: column; align-items: stretch; gap: 32px; padding: 48px 24px; }
  .hero__title { font-size: 30px; }
  .hero__stats { justify-content: space-around; }
}

@media (max-width: 480px) {
  .hero__inner { padding: 36px 16px; }
  .hero__title { font-size: 25px; }
  .hero__subtitle { font-size: 15px; }
  .hero__stats { gap: 18px; padding: 20px 16px; }
  .hero__stat-value { font-size: 22px; }
}
</style>
