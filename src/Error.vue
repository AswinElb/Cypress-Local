<template>
  <div class="d-flex justify-content-end">
    <div
      class="export-container error close-btn ms-0"
      title="Close"
      @click="goBack()"
    >
      <Icon icon-type="x" stroke="gray" />
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <h1>{{ errorMsg ? 'Error' : 'Wrong address' }}</h1>
        <p>{{ errorMsg || 'This url was not found' }}</p>
      </div>
      <div class="col">
        <img :src="Access" class="img-fluid" alt="No Access" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import Icon from '@/components/common/Icon.vue'
  import Access from '@/assets/images/access.png'
  import { useLoggedInUserStore } from './store'

  const store = useLoggedInUserStore()

  const errorMsg = store.pageStateMsg

  const goBack = () => {
    window.parent.postMessage('bl-reports-close', '*')
  }
</script>
<style lang="scss" scoped>
  h1 {
    font-family: 'Open Sans', Helvetica, Arial, Lucida, sans-serif;
    color: #ff733c;
    background: #ffffff40;
  }
</style>
