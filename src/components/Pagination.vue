<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})

const emit = defineEmits(['change'])

// 最多显示 5 个页码，首尾超出时用省略号
const pages = computed(() => {
  const total = props.totalPages
  const current = props.page
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  let start = Math.max(1, current - 2)
  let end = Math.min(total, start + 4)
  start = Math.max(1, end - 4)

  const list = []
  if (start > 1) list.push(1, '...')
  for (let i = start; i <= end; i++) list.push(i)
  if (end < total) list.push('...', total)
  return list
})

function go(target) {
  if (target === '...' || target === props.page) return
  if (target < 1 || target > props.totalPages) return
  emit('change', target)
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pagination" aria-label="分页导航">
    <button
      type="button"
      class="pagination__btn"
      :disabled="page <= 1"
      @click="go(page - 1)"
    >
      上一页
    </button>

    <button
      v-for="(item, index) in pages"
      :key="`${item}-${index}`"
      type="button"
      :class="['pagination__btn', 'pagination__num', { 'is-active': item === page, 'is-gap': item === '...' }]"
      :disabled="item === '...'"
      @click="go(item)"
    >
      {{ item }}
    </button>

    <button
      type="button"
      class="pagination__btn"
      :disabled="page >= totalPages"
      @click="go(page + 1)"
    >
      下一页
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 36px;
}

.pagination__btn {
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  font-size: 14px;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination__btn:hover:not(:disabled):not(.is-active) {
  border-color: var(--color-primary-soft-border);
  color: var(--color-primary);
}

.pagination__btn:disabled { opacity: 0.45; cursor: not-allowed; }

.pagination__btn.is-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
}

.pagination__btn.is-gap { border: none; background: transparent; cursor: default; }

@media (max-width: 480px) {
  .pagination__btn { min-width: 34px; height: 34px; padding: 0 9px; font-size: 13px; }
}
</style>
