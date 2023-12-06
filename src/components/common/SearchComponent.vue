<template>
  <div>
    <div class="input-wrap input-wrap__icon-left">
      <input
        v-model="searchKey"
        type="search"
        class="input"
        aria-label="Search"
        :placeholder="placeholder"
        @keypress.enter="handleSearch"
      />
      <span class="form-icon"><Icon icon-type="search" stroke="gray" /></span>
      <button
        type="reset"
        :class="`search-close ${searchKey ? 'visible' : 'invisible'}`"
        @click="handleSearchClear"
      >
        <Icon icon-type="x" stroke="gray" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  import Icon from './Icon.vue'

  export default defineComponent({
    name: 'SearchComponent',
    components: { Icon },
    props: {
      placeholder: {
        type: String,
        default: 'Search',
      },
    },
    emits: ['search'],
    setup(props, ctx) {
      const searchKey = ref<string>('')

      const handleSearch = () => {
        ctx.emit('search', searchKey.value)
      }

      const handleSearchClear = () => {
        searchKey.value = ''
        ctx.emit('search', searchKey.value)
      }

      return { searchKey, handleSearchClear, handleSearch }
    },
  })
</script>
