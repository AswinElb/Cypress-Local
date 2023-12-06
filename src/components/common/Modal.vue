<template>
  <div class="modal-backdrop fade show"></div>
  <div
    class="modal fade show"
    tabindex="-1"
    aria-labelledby="exampleModalLiveLabel"
    style="display: block"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog" :class="size">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <slot name="header-text">
              <h5 class="modal-title">Modal title</h5>
            </slot>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="close"
            ></button>
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <p>Woohoo, you're reading this text in a modal!</p>
          </slot>
        </div>
        <div class="modal-footer justify-content-end d-flex">
          <slot name="footer">
            <button type="button" class="btn btn-primary" @click="save">
              Save
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="close"
            >
              Cancel
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    size: {
      type: String,
      default: 'modal-lg',
    },
  })
  const emit = defineEmits<{
    (e: 'click:close'): void
    (e: 'click:save'): void
  }>()

  function save() {
    emit('click:save')
  }
  function close() {
    emit('click:close')
  }
</script>
