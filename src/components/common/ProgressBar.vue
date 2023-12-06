<template>
  <modal v-if="props.show" ref="modal">
    <template #header><slot name="header"></slot></template>
    <template #body>
      <p>
        Please don't leave or close this page until the action is completed.
      </p>
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="getStyle"
          data-test="progress"
        ></div>
      </div>
    </template>
    <template #footer>&nbsp;</template>
  </modal>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity'
  import { watch, ref } from 'vue'
  import Modal from './Modal.vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
  })
  const style = ref(10)
  // eslint-disable-next-line
  let newFn: NodeJS.Timeout

  const getStyle = computed(() => {
    return { width: `${style.value}%` }
  })

  function startProgressing() {
    newFn = setInterval(() => {
      style.value = Math.min(style.value + 16, 80)
    }, 1000)
  }

  watch(
    () => props.show,
    (value) => {
      if (value) {
        startProgressing()
      } else {
        clearInterval(newFn)
        style.value = 10
      }
    }
  )
</script>
