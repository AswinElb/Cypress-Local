<template>
  <modal size="modal-md" v-if="props.show" ref="modal" @click:close="close">
    <template #header-text>
      <h5 class="modal-title">
        <slot name="header"></slot>
      </h5>
    </template>
    <template #body><slot name="body"></slot></template>
    <template #footer>
      <button type="button" class="btn btn-primary" @click="confirm">
        Delete
      </button>
      <button type="button" class="btn btn-outline-primary" @click="close">
        Cancel
      </button>
    </template>
  </modal>
</template>

<script setup lang="ts">
  import Modal from './Modal.vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
  }>()

  function confirm() {
    emit('confirm')
  }
  function close() {
    emit('cancel')
  }
</script>
