import { ResponseMeta } from '@/types'
import { Pagination } from '@/types/pagination'
import { ref, computed } from 'vue'

export default function usePagination(initialPagination: Pagination) {
  const pagination = ref<Pagination>(initialPagination)

  const paginationParam = computed(() => ({
    limit: pagination.value.perPage,
    skip: (pagination.value.currentPage - 1) * pagination.value.perPage,
  }))

  const setTotalPages = (meta: ResponseMeta) => {
    pagination.value = {
      ...pagination.value,
      totalPages: Math.ceil(meta.total / pagination.value.perPage),
    }
  }
  const resetPagination = () => {
    pagination.value = {
      ...pagination.value,
      currentPage: 1,
      totalPages: 1,
    }
  }

  const setCurrentPage = (page: number) => {
    pagination.value.currentPage = page
  }

  return {
    pagination,
    paginationParam,
    setTotalPages,
    resetPagination,
    setCurrentPage,
  }
}
