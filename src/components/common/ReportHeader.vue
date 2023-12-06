<template>
  <div class="card-header bs-override">
    <div class="row f-height align-items-center justify-content-between">
      <div class="row no-p col-12 align-items-center">
        <div class="row col-filter align-items-center">
          <div class="col-auto no-p">
            <div class="page__header ms-2">
              Reports
              <span class="badge rounded-pill bg-primary">Pre-Beta</span>
            </div>
          </div>
        </div>
        <div
          class="row col-panel justify-content-between align-items-center pe-0"
        >
          <div class="col-6 col-xl-4">
            <select
              v-model="route"
              class="form-select"
              aria-label="Default select example"
              @change="(value) => updateRoute(value)"
            >
              <option :value="REPORT_ROUTES.COURSE_COMPLETION_SUMMARY">
                {{ getLocalizedText('message.navbar.courseCompletionSummary') }}
              </option>
              <option :value="REPORT_ROUTES.COURSE_COMPLETION_DETAIL">
                {{
                  getLocalizedText('message.navbar.courseCompletionDetailed')
                }}
              </option>
              <option :value="REPORT_ROUTES.MODULE_COMPLETION_SUMMARY">
                {{ getLocalizedText('message.navbar.moduleCompletionSummary') }}
              </option>
              <option :value="REPORT_ROUTES.MODULE_COMPLETION_DETAIL">
                {{
                  getLocalizedText('message.navbar.moduleCompletionDetailed')
                }}
              </option>
            </select>
          </div>
          <div class="col-6 col-xl-8 export d-flex justify-content-end pe-0">
            <div class="d-flex">
              <div
                class="d-flex export-container"
                title="Schedule Report"
                @click="() => updateModalStatus(true)"
              >
                <div class="d-flex">
                  <ScheduleSvg class="svg-white" />
                </div>
              </div>
              <div
                v-if="isReportDownloading"
                class="col-auto align-items-center d-flex export-container spinner-container"
              >
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <dropdown v-else>
                <template #selected="{ toggle }">
                  <div
                    :class="{ disabled: !records?.length }"
                    :disabled="!records.length"
                    class="d-flex export-container btn"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    title="Download Report"
                    @click="toggle"
                  >
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      <ExportSvg class="svg-white" />
                    </div>
                  </div>
                </template>
                <template #options>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="downloadReport('csv')"
                      >CSV</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="downloadReport('xlsx')"
                      >XLSX</a
                    >
                  </li>
                </template>
              </dropdown>
            </div>
            <div
              class="d-flex export-container close-btn"
              title="Close"
              @click="goBack()"
            >
              <div class="row">
                <Icon icon-type="x" stroke="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { REPORT_ROUTES } from '@/pages/Reports/constants'
  import {
    CourseCompletion,
    CourseCompletionDetailed,
  } from '@/pages/Reports/CourseCompletion/types'
  import {
    ModuleCompletion,
    ModuleDetails,
  } from '@/pages/Reports/ModulesCompletion/types'
  import { useLoggedInUserStore } from '@/store'
  import { saveUserSelectedRoute } from '@/utils/user'
  import { getLocalizedText } from '@/utils/util'
  import { computed, PropType } from 'vue'
  import Dropdown from '@/components/common/Dropdown.vue'
  import ExportSvg from '@/assets/images/export.svg?component'
  import ScheduleSvg from '@/assets/images/scheduled-report.svg?component'
  import Icon from './Icon.vue'
  import { ExportFileType } from '@/pages/Reports/types'

  const store = useLoggedInUserStore()

  const props = defineProps({
    records: {
      type: Array as PropType<
        | Array<ModuleCompletion>
        | Array<CourseCompletion>
        | Array<CourseCompletionDetailed>
        | Array<ModuleDetails>
        | Array<Record<never, never>>
      >,
      default: () => [],
    },
    isReportDownloading: {
      type: Boolean,
      default: false,
    },
  })

  const emit = defineEmits<{
    (e: 'download:report', type: ExportFileType): Promise<void>
    (e: 'update:modal-status', status: boolean): void
  }>()

  const route = computed(() => store.route)

  function goBack() {
    window.parent.postMessage('bl-reports-close', '*')
  }

  function downloadReport(type: ExportFileType) {
    emit('download:report', type)
  }
  function updateRoute(event: Event) {
    store.updateRoute((event.currentTarget as HTMLInputElement).value)
    saveUserSelectedRoute((event.currentTarget as HTMLInputElement).value)
  }

  function updateModalStatus(status: boolean) {
    emit('update:modal-status', status)
  }
</script>
