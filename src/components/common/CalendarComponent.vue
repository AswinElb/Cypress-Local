<template>
  <datepicker
    ref="rootDatePicker"
    v-model="dateRange"
    width="100"
    range
    :format="format"
    :enable-time-picker="false"
    :placeholder="getLocalizedText('message.calendarComponent.selectDateRange')"
    class="date-picker"
    @cleared="$emit('range:select', dateRange)"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, watch, PropType } from 'vue'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { displayToast } from '@/utils/show-toast'
  import { Variant } from '@/types/toast'
  import { getLocalizedText } from '@/utils/util'

  export default defineComponent({
    name: 'CalendarComponent',
    components: { Datepicker },
    props: {
      initialDate: {
        type: Array as PropType<Array<Date>>,
        required: false,
        default: () => [],
      },
    },
    emits: ['range:select'],
    setup(_props, ctx) {
      const dateRange = ref<Array<Date> | null>(_props.initialDate || null)
      const rootDatePicker = ref<InstanceType<typeof Datepicker> | null>(null)

      const getRef = () => rootDatePicker.value

      watch(dateRange, () => {
        if (dateRange.value && dateRange.value[1] === null) {
          displayToast(
            getLocalizedText('alert.filters.datePickerToAndFrom'),
            Variant.DANGER,
            'Error'
          )
          return
        }
        ctx.emit('range:select', dateRange.value)
      })

      const resetDate = () => {
        dateRange.value = null
      }

      const setDate = (dates: Date[]) => {
        dateRange.value = dates
      }

      const format = (dates: Date[]) => {
        const formattedDates = dates.map((date) => {
          if (!date) {
            return ''
          }
          const day = date.getDate()
          const month = date.getMonth() + 1
          const year = date.getFullYear()
          return `${day}/${month}/${year}`
        })

        return `${formattedDates[0]} - ${formattedDates[1]}`
      }

      return {
        dateRange,
        format,
        rootDatePicker,
        getRef,
        resetDate,
        setDate,
        getLocalizedText,
      }
    },
  })
</script>
