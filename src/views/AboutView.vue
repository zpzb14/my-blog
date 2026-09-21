<script setup>
const skills = [
  { group: '编程语言', items: ['Java', 'C/C++', 'JavaScript', 'HTML/CSS'] },
  { group: '后端与数据库', items: ['面向对象编程', 'MySQL 基础', '增删改查 SQL'] },
  { group: '前端', items: ['Vue 3', 'Vue Router', 'Axios', 'Flex / Grid 布局'] },
  { group: '工具', items: ['Git', 'Maven', 'IntelliJ IDEA', 'VS Code'] }
]

const timeline = [
  { time: '2026.09 - 至今', title: '个人博客网站', desc: '使用 Vue 3 + Vite 重构个人主页，组件化拆分页面模块' },
  { time: '2025.03 - 2025.06', title: '学校互联网+创新中心 · 前端开发学习小组', desc: '完成前端专项训练，产出静态页面作品，参与技术分享与文档编写' }
]
</script>

<template>
  <div class="container">
    <h1 class="page-title">关于我</h1>
    <p class="page-desc">软件工程专业在读，方向是 Java 后端开发，同时对前端也有兴趣。</p>

    <section class="block">
      <h2 class="block__title">简介</h2>
      <p class="about__text">
        我是陈泓任，重庆移通学院软件工程专业 2027 届学生。目前主要学习 Java 后端开发，
        熟悉面向对象编程思想，能使用 MySQL 完成基本的数据库操作，也掌握 HTML/CSS 与 Vue 3 的前端开发能力。
      </p>
      <p class="about__text">
        这个博客是我用来记录学习过程的地方。把学到的东西写出来，是检验自己是否真正理解的最好方式。
      </p>
    </section>

    <section class="block">
      <h2 class="block__title">技能</h2>
      <div class="skills">
        <div v-for="s in skills" :key="s.group" class="skills__group">
          <h3 class="skills__name">{{ s.group }}</h3>
          <ul class="skills__list">
            <li v-for="item in s.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="block">
      <h2 class="block__title">经历</h2>
      <ul class="timeline">
        <li v-for="item in timeline" :key="item.title" class="timeline__item">
          <span class="timeline__time">{{ item.time }}</span>
          <strong class="timeline__title">{{ item.title }}</strong>
          <p class="timeline__desc">{{ item.desc }}</p>
        </li>
      </ul>
    </section>

    <section class="block">
      <h2 class="block__title">联系我</h2>
      <ul class="contact">
        <li>邮箱：2724115251@qq.com</li>
        <li>所在地：重庆</li>
        <li>期望城市：重庆 / 成都</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.block {
  margin-bottom: 38px;
  padding: 28px 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.block__title {
  margin: 0 0 18px;
  padding-left: 12px;
  font-size: 19px;
  border-left: 3px solid var(--color-primary);
}

.about__text { margin: 0 0 14px; font-size: 15.5px; line-height: 1.9; }
.about__text:last-child { margin-bottom: 0; }

.skills {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.skills__name { margin: 0 0 10px; font-size: 15px; color: var(--color-primary); }

.skills__list { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }

.skills__list li {
  padding: 5px 12px;
  font-size: 13.5px;
  color: var(--color-text-muted);
  background: var(--color-surface-alt);
  border-radius: 999px;
}

.timeline { margin: 0; padding: 0; list-style: none; }

.timeline__item {
  padding: 0 0 20px 20px;
  border-left: 2px solid var(--color-border);
  position: relative;
}

.timeline__item:last-child { padding-bottom: 0; border-left-color: transparent; }

.timeline__item::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-primary);
}

.timeline__time { display: block; font-size: 13px; color: var(--color-text-muted); margin-bottom: 5px; }
.timeline__title { display: block; font-size: 15.5px; margin-bottom: 6px; }
.timeline__desc { margin: 0; font-size: 14.5px; color: var(--color-text-muted); line-height: 1.8; }

.contact { margin: 0; padding-left: 20px; }
.contact li { margin-bottom: 8px; font-size: 15px; }

@media (max-width: 640px) {
  .block { padding: 22px 18px; }
  .skills { grid-template-columns: minmax(0, 1fr); gap: 18px; }
}
</style>
