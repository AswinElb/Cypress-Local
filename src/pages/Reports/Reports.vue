<template>
  <ScheduleEmailAlert
    v-if="showDownloadAlert"
    :alert-text="alertText"
    :source="store.source"
    @report-schedule-cancelled="handleCancelRequest"
    @report-schedule-confirmed="handleExport"
  />
  <CourseCompletionSummary
    v-if="route === REPORT_ROUTES.COURSE_COMPLETION_SUMMARY"
  />

  <CourseCompletionDetailed
    v-else-if="route === REPORT_ROUTES.COURSE_COMPLETION_DETAIL"
  />

  <ModuleCompletionSummary
    v-else-if="route === REPORT_ROUTES.MODULE_COMPLETION_SUMMARY"
  />

  <ModuleCompletionDetailed v-else />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import CourseCompletionSummary from './CourseCompletion/CourseCompletionSummary.vue'
  import CourseCompletionDetailed from './CourseCompletion/CourseCompletionDetailed.vue'
  import ModuleCompletionDetailed from './ModulesCompletion/ModuleCompletionDetailed.vue'
  import ModuleCompletionSummary from './ModulesCompletion/ModuleCompletionSummary.vue'
  import { useLoggedInUserStore } from '@/store'
  import { REPORT_ROUTES } from './constants'
  import Cookies from 'js-cookie'
  import { CUSTOM_TOKEN } from '@/constants/auth'
  import { scheduleLargeReport, cancelRequest } from '@/api/calls'
  import { getLocalizedText } from '@/utils/util'
  import { Variant } from '@/types/toast'
  import { storeToRefs } from 'pinia'
  import { displayToast } from '@/utils/show-toast'
  import ScheduleEmailAlert from '@/components/common/ScheduleEmailAlert.vue'

  const store = useLoggedInUserStore()

  const { scheduleExportUrl, filter, showDownloadAlert, alertText } =
    storeToRefs(store)

  const handleExport = async () => {
    const customToken = Cookies.get(CUSTOM_TOKEN)
    store.updateReportDownloadingStatus(false)
    store.updateAlertStatus(false, scheduleExportUrl.value)

    try {
      await scheduleLargeReport(scheduleExportUrl.value, {
        customToken,
        filter: filter.value,
      })
    } catch (error) {
      displayToast(
        getLocalizedText('alert.moduleDetail.scheduleFail'),
        Variant.DANGER,
        'Error'
      )
    }
  }
  const handleCancelRequest = () => {
    store.updateReportDownloadingStatus(false)
    store.updateAlertStatus(false, scheduleExportUrl.value)
  }
  const route = computed(() => store.route)
</script>
