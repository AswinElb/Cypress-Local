<!-- TODO: Remove or reuse -->
<script setup lang="ts">
  import BackSvg from '@/assets/images/back.svg?component'
  const goBack = () => {
    window.postMessage('bl-reports-close', '*')
  }
</script>

<template>
  <div tag="button" class="menu-items row" @click="goBack">
    <div class="link-container">
      <BackSvg class="svg" />
    </div>
  </div>
</template>
