<template>
  <selector-button
    v-for="day in DAYS"
    :key="day.id"
    :selected="selectedDay === day.cronValue"
    @update:selection="() => select(day.cronValue)"
    @update:deselection="deselect"
  >
    {{ day.label }}
  </selector-button>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import SelectorButton from '@/components/common/SelectorButton.vue'
  import { DAYS } from './constants'

  const selectedDay = ref<typeof DAYS[number]['cronValue'] | null>(null)

  const emit = defineEmits<{
    (e: 'update', selected: typeof selectedDay.value): void
  }>()

  function select(day: typeof selectedDay.value) {
    selectedDay.value = day
  }

  function deselect() {
    selectedDay.value = null
  }

  watch(selectedDay, (value) => {
    emit('update', value)
  })
</script>
