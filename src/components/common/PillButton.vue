<template>
  <span :class="`badge ${props.type}`"
    >{{ text
    }}<button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
      @click="closePill"
    >
      <span aria-hidden="true">&times;</span>
    </button></span
  >
</template>

<script lang="ts" setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'bg-secondary',
    },
    text: {
      type: String,
      default: '',
    },
  })

  const emit = defineEmits(['close'])

  const closePill = () => {
    emit('close', props.text)
  }
</script>
