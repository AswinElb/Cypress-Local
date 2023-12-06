<script setup lang="ts">
  import { Sort, TableColumns, SortEmitObject } from '@/types/table'
  import { PropType, computed } from 'vue'
  import BaseTable from './BaseTable.vue'
  import BaseTableWithInfiniteScroll from './BaseTableWithInfiniteScroll.vue'

  import SortButton from './SortButton.vue'

  const props = defineProps({
    columns: {
      type: Array as PropType<Array<TableColumns>>,
      required: true,
    },
    records: {
      type: Array as PropType<Array<Record<any, any>>>,
      default: () => [],
    },
    sortable: {
      type: Object as PropType<Record<string, Sort>>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isMoreDataLoading: {
      type: Boolean,
      default: false,
    },
    isInfiniteScrollEnabled: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits<{
    (e: 'sort', payload: SortEmitObject): void
    (e: 'loadMore'): void
  }>()

  const loadMore = () => {
    emit('loadMore')
  }

  const emitSort = (id: string) => {
    const value = id
    const sortable: Record<string, any> = {}
    Object.keys(props.sortable).forEach((column) => {
      sortable[column] = 'default'
    })
    sortable[id] = props.sortable[id] === Sort.asc ? Sort.dsc : Sort.asc
    emit('sort', {
      sortKey: value,
      sortable,
    })
  }

  const selectedTable = computed(() => {
    return props.isInfiniteScrollEnabled
      ? BaseTableWithInfiniteScroll
      : BaseTable
  })
</script>

<template>
  <component
    :is="selectedTable"
    :columns="columns"
    :records="records"
    :loading="loading"
    :is-more-data-loading="isMoreDataLoading"
    @load-more="loadMore"
  >
    <template v-for="column in columns" #[`th-${column.id}`] :key="column.id">
      <slot :name="`th-${column.id}`">
        <template v-if="!!sortable[column.id]">
          <th
            scope="col"
            :class="`table-row__head sortable ${
              column.isNumerical ? 'text-end' : 'text-start'
            }`"
            @click="emitSort(column.id)"
          >
            {{ column.label }}
            <sort-button :sort="sortable[column.id]" />
          </th>
        </template>
        <template v-else>
          <th
            scope="col"
            :class="`table-row__head ${
              column.isNumerical ? 'text-end' : 'text-start'
            }`"
          >
            {{ column.label }}
          </th>
        </template>
      </slot>
    </template>
    <template v-for="col in columns" #[col.id]="scope">
      <slot :name="col.id" v-bind="{ ...scope }"></slot>
    </template>
  </component>
</template>
