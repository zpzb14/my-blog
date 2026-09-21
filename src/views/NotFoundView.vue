<template>
  <div class="container">
    <div class="nf">
      <p class="nf__code">404</p>
      <h1 class="nf__title">页面不存在</h1>
      <p class="nf__desc">你访问的地址可能已经被移动或删除了。</p>
      <RouterLink class="btn btn--primary" :to="{ name: 'home' }">回到首页</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.nf { padding: 80px 0; text-align: center; }
.nf__code { margin: 0; font-size: 72px; font-weight: 800; color: var(--color-primary-soft-border); line-height: 1; }
.nf__title { margin: 16px 0 10px; font-size: 24px; }
.nf__desc { margin: 0 0 26px; color: var(--color-text-muted); }
</style>
