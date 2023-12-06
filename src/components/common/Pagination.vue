<template>
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: isFirstPage || disabled }">
      <a
        class="page-link cursor-link"
        tabindex="-1"
        role="button"
        :aria-disabled="isFirstPage"
        @click="goToFirstPage"
      >
        First
      </a>
    </li>
    <li class="page-item" :class="{ disabled: isFirstPage || disabled }">
      <a
        class="page-link cursor-link"
        tabindex="-1"
        role="button"
        :aria-disabled="isFirstPage"
        @click="gotoPrevious"
      >
        Previous
      </a>
    </li>
    <li
      v-for="(page, idx) in pages"
      :key="idx"
      :class="{
        active: page === currentPage,
        disabled: page > totalPages || disabled,
      }"
      class="page-item cursor-link"
    >
      <a class="page-link" role="button" @click="() => gotoPage(page)">{{
        page
      }}</a>
    </li>
    <li
      class="page-item"
      :class="{ disabled: currentPage === totalPages || disabled }"
    >
      <a
        class="page-link cursor-link"
        aria-disabled="true"
        role="button"
        @click="gotoNext"
        >Next</a
      >
    </li>
    <li
      class="page-item"
      :class="{ disabled: currentPage === totalPages || disabled }"
    >
      <a
        class="page-link cursor-link"
        aria-disabled="true"
        role="button"
        @click="goToLastPage"
        >Last</a
      >
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, computed, toRefs } from 'vue'
  export default defineComponent({
    name: 'Pagination',
    props: {
      pagination: {
        type: Object,
        required: true,
      },
      visibleCount: {
        type: Number,
        required: false,
        default: 4,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['page:change'],
    setup(props, ctx) {
      const { pagination, visibleCount } = toRefs(props)

      const totalPages = computed(() => pagination.value.totalPages)
      const currentPage = computed(() => pagination.value.currentPage)

      const isFirstPage = computed(() => currentPage.value === 1)

      const startPage = computed(() => {
        if (currentPage.value === 1) {
          return 1
        }

        if (
          currentPage.value === totalPages.value ||
          currentPage.value === totalPages.value - 1
        ) {
          return Math.max(totalPages.value - visibleCount.value + 1, 1)
        }

        return currentPage.value - 1
      })

      const endPage = computed(() => {
        return Math.min(
          startPage.value + visibleCount.value - 1,
          totalPages.value
        )
      })

      const pages = computed(() => {
        const range = []

        for (let i = startPage.value; i <= endPage.value; i += 1) {
          range.push(i)
        }

        return range
      })

      const goToFirstPage = () => ctx.emit('page:change', 1)

      const goToLastPage = () => ctx.emit('page:change', totalPages)

      const gotoPrevious = () =>
        ctx.emit('page:change', Math.max(currentPage.value - 1, 1))

      const gotoNext = () =>
        ctx.emit(
          'page:change',
          Math.min(currentPage.value + 1, totalPages.value)
        )

      const gotoPage = (page: number) => ctx.emit('page:change', page)
      return {
        pages,
        totalPages,
        isFirstPage,
        currentPage,
        gotoPrevious,
        gotoNext,
        gotoPage,
        goToFirstPage,
        goToLastPage,
      }
    },
  })
</script>
