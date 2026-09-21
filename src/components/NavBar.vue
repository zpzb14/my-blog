<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const links = [
  { name: 'home', label: '首页' },
  { name: 'articles', label: '文章' },
  { name: 'about', label: '关于我' }
]

// 路由变化时自动收起移动端菜单
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner">
      <RouterLink class="navbar__brand" :to="{ name: 'home' }">
        <span class="navbar__logo">CHR</span>
        <span class="navbar__title">陈泓任的技术博客</span>
      </RouterLink>

      <button
        class="navbar__toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-label="展开导航菜单"
        @click="menuOpen = !menuOpen"
      >
        <span :class="['navbar__bar', { 'is-open': menuOpen }]"></span>
      </button>

      <nav :class="['navbar__nav', { 'is-open': menuOpen }]">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          class="navbar__link"
          :to="{ name: link.name }"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.navbar__inner {
  max-width: var(--layout-max);
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  color: var(--color-text);
}

.navbar__logo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--color-primary);
  color: #fff;
  font-size: 13px;
  letter-spacing: 0.5px;
  display: grid;
  place-items: center;
}

.navbar__title { font-size: 16px; }

.navbar__nav { display: flex; align-items: center; gap: 6px; }

.navbar__link {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 15px;
  color: var(--color-text-muted);
  transition: background 0.2s, color 0.2s;
}

.navbar__link:hover { background: var(--color-surface-alt); color: var(--color-text); }

.navbar__link.router-link-exact-active {
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-weight: 600;
}

.navbar__toggle {
  display: none;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  position: relative;
}

.navbar__bar,
.navbar__bar::before,
.navbar__bar::after {
  position: absolute;
  left: 50%;
  width: 18px;
  height: 2px;
  background: var(--color-text);
  transform: translateX(-50%);
  transition: transform 0.2s, opacity 0.2s;
  content: '';
}

.navbar__bar { top: 50%; margin-top: -1px; }
.navbar__bar::before { top: -6px; }
.navbar__bar::after { top: 6px; }
.navbar__bar.is-open { background: transparent; }
.navbar__bar.is-open::before { transform: translateX(-50%) rotate(45deg); top: 0; }
.navbar__bar.is-open::after { transform: translateX(-50%) rotate(-45deg); top: 0; }

/* 移动端：折叠为下拉菜单 */
@media (max-width: 640px) {
  .navbar__inner { padding: 0 16px; }
  .navbar__title { font-size: 15px; }
  .navbar__toggle { display: block; }

  .navbar__nav {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 16px 16px;
    background: #fff;
    border-bottom: 1px solid var(--color-border);
    display: none;
  }

  .navbar__nav.is-open { display: flex; }
  .navbar__link { padding: 12px 8px; }
}
</style>
