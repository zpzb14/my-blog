<script setup>
defineProps({
  tags: { type: Array, required: true },
  modelValue: { type: String, default: '' },
  counts: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function select(tag) {
  emit('update:modelValue', tag)
}
</script>

<template>
  <div class="tagfilter" role="group" aria-label="按标签筛选文章">
    <button
      type="button"
      :class="['tagfilter__item', { 'is-active': modelValue === '' }]"
      @click="select('')"
    >
      全部
      <span class="tagfilter__count">{{ counts.__all ?? 0 }}</span>
    </button>

    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      :class="['tagfilter__item', { 'is-active': modelValue === tag }]"
      @click="select(tag)"
    >
      {{ tag }}
      <span class="tagfilter__count">{{ counts[tag] ?? 0 }}</span>
    </button>
  </div>
</template>

<style scoped>
.tagfilter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.tagfilter__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-size: 14px;
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s;
}

.tagfilter__item:hover {
  border-color: var(--color-primary-soft-border);
  color: var(--color-primary);
}

.tagfilter__item.is-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  font-weight: 600;
}

.tagfilter__count {
  font-size: 12px;
  opacity: 0.7;
}

@media (max-width: 480px) {
  .tagfilter { gap: 6px; }
  .tagfilter__item { padding: 6px 11px; font-size: 13px; }
}
</style>
