<template>
  <vue-feather
    :type="iconType"
    :title="title"
    class="icon-container"
    :size="size"
    :stroke="stroke"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import VueFeather from 'vue-feather'

  export default defineComponent({
    name: 'Icon',
    components: { VueFeather },
    props: {
      iconType: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
      stroke: {
        type: String,
        default: 'black',
      },
      size: {
        type: String,
        default: '24',
      },
    },
  })
</script>
