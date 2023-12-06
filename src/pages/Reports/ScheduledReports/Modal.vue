<template>
  <keep-alive>
    <component
      :is="getComponent"
      ref="scheduleReport"
      :show="show"
      :recurrence-data="recurrenceData"
      :report="reportValue"
      :edit-mode="editMode"
      :data="data"
      :fetched-data="oldData"
      :loading="loading"
      @update:recurrence="saveRecurrence"
      @cancel:recurrence="cancelRecurrence"
      @close="close"
      @custom-frequency="setCustomFrequency"
      @reset:custom-frequency="resetCustom"
      @update:close-modal="close"
      @update:save="scheduleExport"
    />
  </keep-alive>
</template>

<script setup lang="ts">
  import CustomRecurrence from './CustomRecurrence.vue'
  import { computed, nextTick, PropType, ref, watch } from 'vue'
  import { cloneDeep, omit, pick } from 'lodash/fp'
  import {
    RecurrenceDataAndString,
    COMPONENTS,
    SchedulePayload,
    ReportProp,
    FormData,
    ENDS_ON,
    REPORT_FREQUENCY,
    RecurrenceData,
  } from './types'
  import { INITIAL_STATE, getReportState } from './constants'
  import ScheduleReportDetails from './ScheduleReportDetails.vue'
  import {
    fetchScheduledReport,
    scheduleReport as createScheduleReport,
    updateScheduleReport,
  } from '@/api/calls'
  import { displayToast } from '@/utils/show-toast'
  import { Variant } from '@/types/toast'
  import Cookies from 'js-cookie'
  import { SCHEDULER_CUSTOM_TOKEN } from '@/constants/auth'
  import { DateTime } from 'luxon'
  import { getLocalizedText } from '@/utils/util'

  const componentMap = {
    [COMPONENTS.FORM]: ScheduleReportDetails,
    [COMPONENTS.RECURRENCE]: CustomRecurrence,
  }

  const scheduleReport = ref()

  const props = defineProps({
    show: {
      type: Boolean,
      default: true,
    },
    report: {
      type: Object as PropType<ReportProp>,
      default: () => ({
        title: '',
        url: '',
        filter: {},
      }),
    },
    id: {
      type: Number,
      default: null,
    },
  })

  const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save'): void
    (e: 'pre-save'): void
    (e: 'error'): void
  }>()

  const loading = ref(false)

  const activeComponent = ref<keyof typeof componentMap>(COMPONENTS.FORM)
  const reportDetails = ref<ReportProp>()
  const data = ref<FormData & { timeZone: string; url?: string }>()

  const getComponent = computed(() => {
    return componentMap[activeComponent.value]
  })

  const oldData = ref({ editSelectString: '', oldInterval: '' })

  const editMode = computed(() => !!props.id)

  watch(
    () => props.show,
    (value) => {
      scheduleReport.value?.reset()
      if (value && props.id) {
        fetchReportDetail(props.id)
      }
    }
  )

  const recurrenceData = ref<RecurrenceDataAndString>({
    data: cloneDeep(INITIAL_STATE),
    selectString: '',
  })

  function saveRecurrence(payload: RecurrenceDataAndString) {
    recurrenceData.value = payload
    activeComponent.value = COMPONENTS.FORM
  }

  function cancelRecurrence() {
    recurrenceData.value = {
      data: cloneDeep(INITIAL_STATE),
      selectString: '',
    }
    activeComponent.value = COMPONENTS.FORM
    nextTick(() => {
      scheduleReport.value?.resetFrequency()
    })
  }

  async function fetchReportDetail(id: number) {
    loading.value = true
    try {
      const res = await fetchScheduledReport(id)
      const responseData = res.data.data
      const hour = Number(responseData.interval.split(' ')[1])
      const minute = Number(responseData.interval.split(' ')[0])
      let adjustedMinute = minute
      let adjustedHour = hour
      if (responseData.timeZone) {
        const preAdjustedDate = new Date()
        preAdjustedDate.setUTCMinutes(minute)
        preAdjustedDate.setUTCHours(hour)

        const tzAdjustedLuxon = DateTime.fromISO(
          preAdjustedDate.toISOString(),
          {
            zone: responseData.timeZone,
          }
        )
        adjustedHour = tzAdjustedLuxon.hour
        adjustedMinute = tzAdjustedLuxon.minute
      }
      data.value = {
        name: responseData.name,
        range: responseData.context.range,
        timeZone: responseData.timeZone || '',
        recipients: responseData.context.recipients,
        frequency: {
          includeWeekends: !!responseData.includeWeekends,
          time: {
            hours: adjustedHour,
            minutes: adjustedMinute,
          },
          type: REPORT_FREQUENCY.EDIT,
        },
        url: responseData.callbackUrl,
      }

      let callbackUrl = responseData.callbackUrl
      let reportName = ''

      if (callbackUrl.includes('course-summary')) {
        reportName = getLocalizedText('message.navbar.courseCompletionSummary')
      } else if (callbackUrl.includes('course-details')) {
        reportName = getLocalizedText('message.navbar.courseCompletionDetailed')
      } else if (callbackUrl.includes('module-summary')) {
        reportName = getLocalizedText('message.navbar.moduleCompletionSummary')
      } else if (callbackUrl.includes('module-details')) {
        reportName = getLocalizedText('message.navbar.moduleCompletionDetailed')
      }

      reportDetails.value = {
        filter: responseData.context.filter,
        url: '',
        title: reportName,
      }

      if (responseData.meta) {
        const meta = responseData.meta
        let endsObj: RecurrenceData['ends'] = {
          type: responseData.endDate
            ? ENDS_ON.DATE
            : responseData.endOccurrenceLimit
            ? ENDS_ON.AFTER
            : ENDS_ON.NEVER,
          afterValue: responseData.endOccurrenceLimit || 1,
          onValue: responseData.endDate || new Date(),
        }

        recurrenceData.value = {
          data: {
            repeatMonthlyOn: meta.repeatMonthlyOn,
            repeatOn: meta.repeatOn,
            repeatType: meta.repeatType,
            ends: endsObj,
          },
          selectString: '',
        }

        oldData.value = {
          editSelectString: meta.selectString,
          oldInterval: responseData.interval,
        }
      }
    } catch (e) {
      displayToast(
        getLocalizedText('alert.scheduleReportModal.editFetchFail'),
        Variant.DANGER,
        'Error'
      )
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  function close() {
    cancelRecurrence()
    activeComponent.value = COMPONENTS.FORM
    nextTick(() => {
      scheduleReport.value.reset()
      data.value = {
        ...getReportState(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
      emit('close')
    })
  }

  function setCustomFrequency() {
    activeComponent.value = COMPONENTS.RECURRENCE
  }

  function resetCustom() {
    recurrenceData.value = {
      data: cloneDeep(INITIAL_STATE),
      selectString: '',
    }
  }

  async function scheduleExport(payload: SchedulePayload) {
    const payloadData = formatPayload(
      payload,
      data.value?.url || props.report.url
    )

    loading.value = true
    let isEditMode = false
    try {
      emit('pre-save')

      isEditMode = editMode.value

      isEditMode
        ? await updateScheduleReport(props.id, payloadData)
        : await createScheduleReport(payloadData)

      displayToast(
        isEditMode
          ? getLocalizedText('alert.scheduleReportModal.updateSuccess')
          : getLocalizedText('alert.scheduleReportModal.creationSuccess'),
        Variant.SUCCESS,
        'Success'
      )
      scheduleReport.value.reset()
      emit('save')
      data.value = undefined
    } catch (e) {
      displayToast(
        isEditMode
          ? getLocalizedText('alert.scheduleReportModal.updateFail')
          : getLocalizedText('alert.scheduleReportModal.creationFail'),
        Variant.DANGER,
        'Error'
      )
      emit('error')
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  function formatPayload(payload: SchedulePayload, url: string) {
    const endDateObj: { endDate?: Date; endOccurrenceLimit?: number } = {}
    if (payload.until.type === ENDS_ON.DATE) {
      endDateObj.endDate = payload.until.onValue
    } else if (payload.until.type === ENDS_ON.AFTER) {
      endDateObj.endOccurrenceLimit = payload.until.afterValue
    }

    let repeatOptions = {}
    if (payload.isCustom) {
      repeatOptions = omit(['ends'], recurrenceData.value.data)
    }

    return {
      ...pick(['name', 'interval', 'timeZone', 'includeWeekends'], payload),
      ...endDateObj,
      context: {
        recipients: payload.recipients,
        range: payload.range,
        timeZone: payload.timeZone,
        eventName: payload.name,
        filter: editMode.value
          ? reportDetails.value?.filter
          : props.report.filter,
        customToken: Cookies.get(SCHEDULER_CUSTOM_TOKEN),
      },
      meta: {
        selectString: payload.selectString,
        ...repeatOptions,
      },
      callbackUrl: url,
    }
  }

  const reportValue = computed(() => {
    if (editMode.value && reportDetails.value) {
      return reportDetails.value
    }
    return props.report
  })
</script>
