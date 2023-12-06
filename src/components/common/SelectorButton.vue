<template>
  <button
    type="button"
    class="btn btn-sm repeat-selector"
    :class="[props.selected ? 'btn-primary' : 'btn-outline-primary']"
    @click="toggleSelected"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps({
    selected: {
      type: Boolean,
      default: true,
    },
  })

  const emit = defineEmits<{
    (e: 'update:selection'): void
    (e: 'update:deselection'): void
  }>()

  function toggleSelected() {
    props.selected ? emit('update:deselection') : emit('update:selection')
  }
</script>
