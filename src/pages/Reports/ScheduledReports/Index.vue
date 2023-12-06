<template>
  <div class="row card-header bs-override" data-test="schedule-report-list">
    <div class="row no-w align-items-center justify-content-between">
      <div class="row f-height col-12 align-items-center">
        <div class="col-auto no-p">
          <div class="page__header">
            Scheduled Reports
            <span class="badge rounded-pill bg-primary">Pre-Beta</span>
          </div>
        </div>
      </div>
      <div
        class="col-auto export-container close-btn"
        title="Close"
        @click="goBack()"
      >
        <div class="row">
          <Icon icon-type="x" stroke="white" />
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <table-with-sort
      :records="records"
      :columns="columns"
      :loading="loading"
      :sortable="sortable"
      class="scheduled-report__table"
      data-test="schedule-report-table"
    >
      <template #name="scope">
        <span :class="[getPausedClass(scope)]">{{ scope.name }}</span></template
      >
      <template #selectString="scope">
        <span :class="[getPausedClass(scope)]">{{
          scope.selectString
        }}</span></template
      >
      <template #range="scope">
        <span :class="[getPausedClass(scope)]">{{
          formatRange(scope.range)
        }}</span>
      </template>
      <template #totalRuns="scope">
        <span :class="[getPausedClass(scope)]">{{ scope.totalRuns }}</span>
      </template>
      <template #lastRun="scope">
        <pause-svg v-if="scope.status === Status.PAUSED" class="mb-1" />
        <success-svg
          v-else-if="scope.lastRunSuccess && scope.totalRuns"
          class="mb-1"
        />
        <warning-svg
          v-else-if="!scope.lastRunSuccess && scope.totalRuns"
          class="mb-1"
        />
        <span
          v-if="scope.lastRun"
          class="ms-1"
          :class="[
            scope.status === Status.PAUSED || !scope.lastRunSuccess
              ? 'text-black-50'
              : 'last-run',
          ]"
          @click="handleDownloadLastRun(scope.eventId, scope.name)"
        >
          {{ formatLastRun(new Date(scope.lastRun)) }}
        </span>
        <span v-else> N/A </span>
      </template>
      <template #action="scope">
        <dropdown>
          <template #selected="{ toggle, activeClass }">
            <button
              id="dropdownMenuButton1"
              class="btn btn-link"
              :class="{ 'active-menu': activeClass }"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="toggle"
            >
              <meatball-svg />
            </button>
          </template>
          <template #options="{ hide }">
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click="
                  () => {
                    hide()
                    editSchedule(scope.id)
                  }
                "
                >Edit</a
              >
            </li>
            <li>
              <a
                v-if="scope.status === Status.PAUSED"
                class="dropdown-item"
                href="#"
                @click="
                  () => {
                    hide()
                    resumeSchedule(scope.id)
                  }
                "
                >Resume</a
              >
              <a
                v-else
                class="dropdown-item"
                href="#"
                @click="
                  () => {
                    hide()
                    pauseSchedule(scope.id)
                  }
                "
                >Pause</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="#"
                @click="
                  () => {
                    hide()
                    deleteSchedule(scope.id)
                  }
                "
                >Delete</a
              >
            </li>
          </template>
        </dropdown>
      </template>
    </table-with-sort>
    <pagination
      v-if="records?.length"
      :disabled="loading"
      class="mt-0"
      :pagination="pagination"
      @page:change="handlePageChange"
    />
  </div>
  <schedule-modal
    :id="selectedId"
    :show="showEditModal"
    @close="() => updateEditModalStatus(false)"
    @save="handleUpdate"
    @error="handleModalError"
    @pre-save="handleSchedulePreUpdate"
  ></schedule-modal>
  <progress-bar :show="showProgress">
    <template #header
      ><h5 class="modal-title">{{ progressBarText }}</h5></template
    >
  </progress-bar>
  <confirm
    :show="showConfirm"
    @cancel="() => (showConfirm = false)"
    @confirm="() => deleteConfirm(selectedId)"
  >
    <template #header>{{ getMessage('deleteConfirmationHeader') }}</template>
    <template #body>
      <p>
        {{ getMessage('deleteConfirmation') }}
      </p>
    </template>
  </confirm>
</template>

<script lang="ts">
  import { defineComponent, ref, onBeforeMount } from 'vue'

  import TableWithSort from '@/components/common/TableWithSort.vue'
  import { Sort } from '@/types/table'
  import { TableColumns } from '@/types/table'

  import usePagination from '@/composables/pagination'
  import Pagination from '@/components/common/Pagination.vue'
  import { getSpacedDate, formatLastRun } from '@/utils/date'
  import { RANGE, REPORT_FREQUENCY, ScheduledReport, Status } from './types'
  import {
    deleteScheduleReport,
    downloadLastRun,
    fetchScheduledReports,
    pauseScheduleReport,
    resumeScheduleReport,
  } from '@/api/calls'
  import Dropdown from '@/components/common/Dropdown.vue'
  import ScheduleModal from './Modal.vue'
  import ProgressBar from '@/components/common/ProgressBar.vue'
  import Confirm from '@/components/common/Confirm.vue'

  import MeatballSvg from '@/assets/images/meatball.svg?component'
  import WarningSvg from '@/assets/images/warning.svg?component'
  import SuccessSvg from '@/assets/images/success.svg?component'
  import PauseSvg from '@/assets/images/pause-circle.svg?component'
  import { displayToast } from '@/utils/show-toast'
  import { Variant } from '@/types/toast'
  import { PROGRESS_BAR_HEADER } from '../constants'
  import Cookies from 'js-cookie'
  import { CUSTOM_TOKEN } from '@/constants/auth'
  import { downloadBlobFile } from '@/utils/reports'
  import { AxiosError, AxiosResponse } from 'axios'
  import { getLocalizedText } from '@/utils/util'
  import Icon from '@/components/common/Icon.vue'

  export default defineComponent({
    name: 'CourseCompletionsReport',
    components: {
      TableWithSort,
      Pagination,
      MeatballSvg,
      SuccessSvg,
      WarningSvg,
      Dropdown,
      ScheduleModal,
      PauseSvg,
      ProgressBar,
      Confirm,
      Icon,
    },

    setup() {
      const { paginationParam, pagination, setTotalPages, setCurrentPage } =
        usePagination({
          currentPage: 1,
          totalPages: 1,
          perPage: 10,
        })

      const loading = ref(true)
      const selectedId = ref<ScheduledReport['id']>()

      const showProgress = ref(false)
      const progressBarText = ref(PROGRESS_BAR_HEADER.DEFAULT)

      const showConfirm = ref(false)

      const showEditModal = ref(false)
      const updateEditModalStatus = (status: boolean) => {
        showEditModal.value = status
        if (!status) {
          selectedId.value = undefined
        }
      }

      const sortable = ref<Record<string, Sort>>({
        // enrolled: Sort.default,
        // completed: Sort.default,
        // experienced: Sort.default,
        // sent: Sort.default,
        // lastAccessedAt: Sort.default,
      })

      const columns: TableColumns[] = [
        { id: 'name', label: 'Report Name' },
        { id: 'selectString', label: 'Frequency' },
        { id: 'range', label: 'Range' },
        { id: 'lastRun', label: 'Last Run' },
        { id: 'totalRuns', label: 'Total Runs' },
        { id: 'action', label: '' },
      ]

      const records = ref<Array<ScheduledReport> | Array<Record<never, never>>>(
        []
      )

      const handlePageChange = (newPage: number) => {
        pagination.value = {
          ...pagination.value,
          currentPage: newPage,
        }

        scheduleReportLoad()
      }

      onBeforeMount(scheduleReportLoad)

      async function scheduleReportLoad() {
        try {
          loading.value = true
          const res = await fetchScheduledReports({
            limit: paginationParam.value.limit,
            offset: paginationParam.value.skip,
          })
          records.value = res.data.data.map((item) => ({
            id: item.id,
            name: item.name,
            selectString: item.meta?.selectString || REPORT_FREQUENCY.DAILY,
            range: item.context.range,
            lastRun: item.lastRun,
            totalRuns: item.totalRuns,
            status: item.status,
            lastRunSuccess: item.lastRunSuccess,
            eventId: item.eventId,
            callbackUrl: item.callbackUrl,
          }))

          setTotalPages(res.data.meta)
        } catch (e: unknown) {
          displayToast(getAlert('fetchFail'), Variant.DANGER, 'Error')
          console.error(e)
        } finally {
          loading.value = false
        }
      }

      async function deleteCall(id: number) {
        try {
          await deleteScheduleReport(id)
          displayToast(getAlert('deleteSuccess'), Variant.SUCCESS, 'Success')
          setCurrentPage(1)
          scheduleReportLoad()
        } catch (e: unknown) {
          displayToast(getAlert('deleteFail'), Variant.DANGER, 'Error')
          console.error(e)
        } finally {
          showProgress.value = false
        }
      }

      function downloadLastRunMessage() {
        return getLocalizedText(`message.downloadLastRun.notReady`)
      }

      function getAlert(key: string) {
        return getLocalizedText(`alert.scheduleReportList.${key}`)
      }

      function getMessage(key: string) {
        return getLocalizedText(`message.scheduleReportList.${key}`)
      }

      const goBack = () => {
        window.parent.postMessage('bl-reports-close', '*')
      }

      async function pauseCall(id: number) {
        try {
          await pauseScheduleReport(id)
          displayToast(getAlert('pauseSuccess'), Variant.SUCCESS, 'Success')
          scheduleReportLoad()
        } catch (e: unknown) {
          displayToast(getAlert('pauseFail'), Variant.DANGER, 'Error')
          console.error(e)
        } finally {
          showProgress.value = false
        }
      }

      async function resumeCall(id: number) {
        try {
          await resumeScheduleReport(id)
          displayToast(getAlert('resumeSuccess'), Variant.SUCCESS, 'Success')
          scheduleReportLoad()
        } catch (e: unknown) {
          displayToast(getAlert('resumeFail'), Variant.DANGER, 'Error')
          console.error(e)
        } finally {
          showProgress.value = false
        }
      }

      function handleUpdate() {
        showProgress.value = false
        // updateEditModalStatus(false)
        scheduleReportLoad()
      }

      function editSchedule(id: number) {
        selectedId.value = id
        updateEditModalStatus(true)
      }

      async function deleteSchedule(id: number) {
        selectedId.value = id
        showConfirm.value = true
      }

      async function deleteConfirm(id: number | undefined) {
        showConfirm.value = false
        if (!id) {
          return
        }
        progressBarText.value = PROGRESS_BAR_HEADER.DELETE
        showProgress.value = true
        await deleteCall(id)
      }

      async function pauseSchedule(id: number) {
        progressBarText.value = PROGRESS_BAR_HEADER.PAUSE
        showProgress.value = true
        await pauseCall(id)
      }

      async function resumeSchedule(id: number) {
        progressBarText.value = PROGRESS_BAR_HEADER.RESUME
        showProgress.value = true
        await resumeCall(id)
      }

      function getPausedClass(scope: ScheduledReport) {
        return scope.status === Status.PAUSED ? 'text-black-50' : ''
      }

      function handleSchedulePreUpdate() {
        updateEditModalStatus(false)
        progressBarText.value = PROGRESS_BAR_HEADER.DEFAULT
        showProgress.value = true
      }

      function handleModalError() {
        showProgress.value = false
      }

      async function handleDownloadLastRun(eventId: string, eventName: string) {
        const customToken = Cookies.get(CUSTOM_TOKEN)
        try {
          const res = await downloadLastRun({
            eventId,
            eventName,
            customToken,
          })

          const fileSize = downloadBlobFile(`${eventName}.xlsx`, res.data.data)
          return fileSize
        } catch (error) {
          console.error(error)
          displayToast(downloadLastRunMessage(), Variant.DANGER, 'Error')
        }
      }

      function formatRange(range: RANGE) {
        switch (range) {
          case RANGE.LAST_24_HRS:
            return '24 hrs'

          case RANGE.LAST_30_DAYS:
            return '30 days'

          case RANGE.LAST_365_DAYS:
            return '365 days'

          case RANGE.LAST_7_DAYS:
            return '7 days'

          default:
            return ''
        }
      }

      return {
        loading,
        pagination,
        columns,
        records,
        handlePageChange,
        getSpacedDate,
        formatLastRun,
        editSchedule,
        deleteSchedule,
        pauseSchedule,
        showEditModal,
        updateEditModalStatus,
        Status,
        resumeSchedule,
        getPausedClass,
        formatRange,
        selectedId,
        sortable,
        handleUpdate,
        showProgress,
        progressBarText,
        showConfirm,
        deleteConfirm,
        handleSchedulePreUpdate,
        handleDownloadLastRun,
        getMessage,
        goBack,
        handleModalError,
      }
    },
  })
</script>
