<script setup>
const year = new Date().getFullYear()

const links = [
  { href: 'https://github.com/', label: 'GitHub' },
  { href: 'mailto:2724115251@qq.com', label: '邮箱' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <strong>陈泓任的技术博客</strong>
        <p>记录 Java 后端与前端开发的学习过程</p>
      </div>

      <div class="footer__links">
        <a v-for="link in links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer">
          {{ link.label }}
        </a>
      </div>

      <p class="footer__copy">© {{ year }} 陈泓任 · 基于 Vue 3 + Vite 构建</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto;
  background: #fff;
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  max-width: var(--layout-max);
  margin: 0 auto;
  padding: 40px 24px 32px;
  display: grid;
  gap: 20px;
}

.footer__brand strong { font-size: 15px; }
.footer__brand p { margin: 6px 0 0; font-size: 13.5px; color: var(--color-text-muted); }

.footer__links { display: flex; gap: 18px; }
.footer__links a { font-size: 14px; color: var(--color-text-muted); }
.footer__links a:hover { color: var(--color-primary); }

.footer__copy {
  margin: 0;
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
  font-size: 13px;
  color: var(--color-text-muted);
}

@media (max-width: 640px) {
  .footer__inner { padding: 32px 16px 24px; }
}
</style>
