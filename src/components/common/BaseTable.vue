<script setup lang="ts">
  import Loading from '@/pages/Loading.vue'
  import { TableColumns } from '@/types/table'
  import { getLocalizedText } from '@/utils/util'
  import { PropType } from 'vue'

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
  })
</script>

<template>
  <div class="table-wrapper">
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
        <tr v-if="loading" class="text-center">
          <td :colspan="columns.length">
            <slot name="no-records"
              ><div class="table-loader"><Loading /></div
            ></slot>
          </td>
        </tr>
        <template v-else-if="records.length">
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
        </template>
        <tr
          v-else-if="hasError || (!records.length && !loading)"
          class="text-center"
        >
          <td :colspan="columns.length">
            <slot name="no-records">{{
              getLocalizedText('message.general.noRecords')
            }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
