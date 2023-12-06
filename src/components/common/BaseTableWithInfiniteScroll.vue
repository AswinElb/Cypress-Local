<script setup lang="ts">
  import { TableColumns } from '@/types/table'
  import { PropType, ref } from 'vue'
  import { useIntersectionObserver } from '@vueuse/core'
  import Loading from '@/pages/Loading.vue'

  const props = defineProps({
    columns: {
      type: Array as PropType<Array<TableColumns>>,
      required: true,
    },
    records: {
      type: Array as PropType<Array<Record<any, any>>>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    isMoreDataLoading: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['loadMore'])
  const target = ref(null)
  const root = ref(null)

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      emit('loadMore')
    },
    { root }
  )
</script>

<template>
  <div ref="root" class="table-wrapper infinite-table">
    <table class="table table-striped">
      <thead class="table_head">
        <tr>
          <slot
            v-for="(column, thIdx) in columns"
            :key="column.id"
            :name="`th-${column.id}`"
            v-bind="{ ...column, thIdx }"
          >
            <th scope="col" class="table-row__head">
              {{ column.label }}
            </th>
          </slot>
        </tr>
      </thead>
      <tbody>
        <template v-if="records.length && !loading">
          <tr
            v-for="(record, trIdx) in records"
            :key="record.id"
            data-test="table-row"
          >
            <td
              v-for="(column, tdIdx) in columns"
              :key="`${column.id}_${record.id}`"
              :class="`wrap-text ${
                column.isNumerical ? 'text-end' : 'text-start'
              }`"
            >
              <slot :name="column.id" v-bind="{ ...record, tdIdx, trIdx }">
                {{
                  column.isNumerical
                    ? record[column.id].toLocaleString()
                    : record[column.id]
                }}
              </slot>
            </td>
          </tr>
          <!-- When end is reached, this div is in view port of the scroll container, so we load more data -->
          <tr ref="target" style="height: 1px"></tr>

          <tr v-if="isMoreDataLoading">
            <td class="text-center" :colspan="columns.length">
              <div class="infinite-loader"><Loading /></div>
            </td>
          </tr>
        </template>

        <tr v-else-if="loading" class="text-center">
          <td :colspan="columns.length">
            <slot name="no-records"
              ><div class="table-loader"><Loading /></div
            ></slot>
          </td>
        </tr>
        <tr
          v-else-if="hasError || (!records.length && !loading)"
          class="text-center"
        >
          <td :colspan="columns.length">
            <slot name="no-records">No records found</slot>
          </td>
        </tr>
        <tr v-else class="text-center">
          <td :colspan="columns.length">
            <slot name="no-records"
              ><div class="table-loader"><Loading /></div
            ></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
