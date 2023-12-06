<template>
  <div class="row no-w" data-test="module-completion-summary">
    <report-header
      :records="records"
      :is-report-downloading="isReportDownloading"
      @download:report="downloadReport"
      @update:modal-status="updateModalStatus"
    />
  </div>
  <div class="col-12">
    <div class="row">
      <div class="col-filter no-p">
        <div class="card-header-summary">
          <div class="row row justify-content-between gy-4">
            <div class="col-12">
              <div class="row justify-content-end">
                <div class="col-auto">
                  <button
                    class="btn btn-link btn-ghosted"
                    :disabled="!isFilterSelected"
                    @click="resetFilters"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
            <div class="col-12 mt-2">
              <label for="formFile" class="form-label"
                >Module
                <span class="sub-text">
                  ({{ selectedModules.length || 'All' }})
                </span></label
              >
              <VueMultiselect
                v-model="selectedModules"
                :options="modules"
                :multiple="true"
                :close-on-select="false"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
                :custom-label="moduleCustomLabel"
                track-by="id"
                list="moduleOptions"
                :searchable="true"
                :loading="dropdownLoader.isModuleLoading"
                :internal-search="false"
                :select-label="getLocalizedText('message.filters.searchSelect')"
                :clear-on-select="false"
                :options-limit="300"
                :max-height="600"
                :hide-selected="true"
                :show-labels="false"
                @search-change="debouncedGetModules"
              >
                <template #noResult>
                  <template v-if="searchKeys.module.length < 3">
                    {{ getLocalizedText('message.filters.searchHint') }}
                  </template>
                  <template v-else>
                    {{ getLocalizedText('message.filters.searchEmpty') }}
                  </template>
                </template>
                <template #noOptions>
                  {{ getLocalizedText('message.filters.searchHint') }}
                </template>
              </VueMultiselect>
            </div>

            <div class="col-12">
              <label for="formFile" class="form-label">Completion Date</label>
              <calendar-component
                id="formFile"
                ref="completionDatePicker"
                :initial-date="selectedCompletionDate"
                @range:select="(date: Date[]) =>handleDateRangeSelect('completionDate', date)"
              />
            </div>

            <div class="col-12">
              <label for="formFile" class="form-label">Enrollment Date</label>
              <calendar-component
                id="formFile"
                ref="enrollmentDatePicker"
                class="custom-class"
                :initial-date="selectedEnrollmentDate"
                @range:select="(date: Date[]) =>handleDateRangeSelect('enrollmentDate', date)"
              />
            </div>
            <div class="col-12">
              <label for="formFile" class="form-label"
                >Enterprise
                <span
                  v-if="!dropdownStatus.isEnterpriseDisabled"
                  data-test="enterprise-label"
                  class="sub-text"
                >
                  ({{ selectedEnterprises.length || 'All' }})
                </span></label
              >
              <VueMultiselect
                v-model="selectedEnterprises"
                data-test="enterprise-dropdown"
                :options="enterprises"
                :multiple="true"
                :close-on-select="false"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
                label="name"
                track-by="id"
                list="enterpriseOptions"
                :searchable="true"
                :loading="dropdownLoader.isEnterpriseLoading"
                :disabled="dropdownStatus.isEnterpriseDisabled"
                :internal-search="false"
                :select-label="getLocalizedText('message.filters.searchSelect')"
                :clear-on-select="false"
                :options-limit="300"
                :max-height="600"
                :hide-selected="true"
                :show-labels="false"
                @search-change="debouncedGetEnterprises"
              >
                <template #noResult>
                  <template v-if="searchKeys.enterprise.length < 3">
                    {{ getLocalizedText('message.filters.searchHint') }}
                  </template>
                  <template v-else>
                    {{ getLocalizedText('message.filters.searchEmpty') }}
                  </template>
                </template>
                <template #noOptions>
                  {{ getLocalizedText('message.filters.searchHint') }}
                </template>
              </VueMultiselect>
            </div>
            <div class="col-12">
              <label for="formFile" class="form-label"
                >Office
                <span
                  v-if="!dropdownStatus.isOfficeDisabled"
                  data-test="office-label"
                  class="sub-text"
                >
                  ({{ selectedOffices.length || 'All' }})
                </span></label
              >
              <VueMultiselect
                v-model="selectedOffices"
                data-test="office-dropdown"
                :options="offices"
                :multiple="true"
                :close-on-select="false"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
                label="name"
                track-by="id"
                list="officeOptions"
                :searchable="true"
                :loading="dropdownLoader.isOfficeLoading"
                :disabled="dropdownStatus.isOfficeDisabled"
                :internal-search="false"
                :select-label="getLocalizedText('message.filters.searchSelect')"
                :clear-on-select="false"
                :options-limit="300"
                :max-height="600"
                :hide-selected="true"
                :show-labels="false"
                @search-change="debouncedGetOffices"
              >
                <template #noResult>
                  <template v-if="searchKeys.office.length < 3">
                    {{ getLocalizedText('message.filters.searchHint') }}
                  </template>
                  <template v-else>
                    {{ getLocalizedText('message.filters.searchEmpty') }}
                  </template>
                </template>
                <template #noOptions>
                  {{ getLocalizedText('message.filters.searchHint') }}
                </template>
              </VueMultiselect>
            </div>
          </div>
        </div>
      </div>
      <div class="col-table no-p">
        <table-with-sort
          :records="records"
          :columns="columns"
          :loading="loading"
          :sortable="sortable"
          :is-infinite-scroll-enabled="true"
          :is-more-data-loading="isMoreDataLoading"
          @load-more="loadMore"
          @sort="handleSort"
        >
          <template #moduleName="scope">
            <Tooltip :message="scope.title ?? scope.name" :wrap-text="true">
              <a
                class="link-dark cursor-pointer"
                @click="
                  goToDetail({
                    id: scope.id,
                    name: scope.title ?? scope.name,
                  })
                "
                >{{ scope.title ?? scope.name }}
              </a>
            </Tooltip>
          </template>
        </table-with-sort>
      </div>
    </div>
  </div>
  <schedule-modal
    :report="{
      title: getLocalizedText('message.navbar.moduleCompletionSummary'),
      url: EXPORT_URL,
      filter: filter,
    }"
    :show="showModal"
    @close="() => updateModalStatus(false)"
    @save="handleSave"
    @error="handleModalError"
    @pre-save="handleSchedulePreSave"
  ></schedule-modal>
  <progress-bar :show="showProgress">
    <template #header
      ><h5 class="modal-title">{{ progressBarText }}</h5></template
    >
  </progress-bar>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'

  import TableWithSort from '@/components/common/TableWithSort.vue'
  import CalendarComponent from '@/components/common/CalendarComponent.vue'
  import { getSpacedDate } from '@/utils/date'
  import { Sort, TableColumns } from '@/types/table'
  import { displayToast } from '@/utils/show-toast'
  import { getOpenSearchCompatibleSort } from '@/utils/os-compatible-sort'
  import { Variant } from '@/types/toast'
  import VueMultiselect from 'vue-multiselect'
  import { debounce } from 'lodash/fp'
  import Tooltip from '@/components/common/Tooltip.vue'
  import ReportHeader from '@/components/common/ReportHeader.vue'

  import {
    exportModuleSummaryReport,
    fetchEnterprisesWithModuleEnrollments,
    fetchModules,
    fetchModuleSummaryReport,
    fetchOfficesWithModuleEnrollments,
  } from '@/api/calls'
  import {
    ModuleCompletion,
    ModuleCompletionSummaryReportAfterKey,
  } from './types'

  import { Filter } from '@/types/filter'
  import { DateFilter, ExportFileType, FilterObject } from '../types'
  import { MODULE_SUMMARY_FILTER_CHOICES } from '@/constants/auth'
  import { OSEnterprise, OSModule, OSOffice } from '../CourseCompletion/types'
  import {
    DateFilterChoice,
    downloadBlobFile,
    DropdownFilterTypes,
    getCurrentUserFilters,
    getDynamicPaginationLimit,
    restrictDropdownsByUserRole,
    setCurrentUserFilters,
  } from '@/utils/reports'
  import { DropdownStatus } from '@/types/report'
  import { Pages, useLoggedInUserStore } from '@/store'
  import ProgressBar from '@/components/common/ProgressBar.vue'

  import ScheduleModal from '@/pages/Reports/ScheduledReports/Modal.vue'
  import { BASE_URL } from '@/utils/http'
  import { PROGRESS_BAR_HEADER, REPORT_ROUTES } from '../constants'
  import { EXPORT_REPORTS_PREFIX } from '../ScheduledReports/constants'
  import { getLocalizedText } from '@/utils/util'
  import { storeToRefs } from 'pinia'
  import { saveUserSelectedRoute } from '@/utils/user'

  interface DropdownLoader {
    isOfficeLoading: boolean
    isEnterpriseLoading: boolean
    isModuleLoading: boolean
  }

  interface SearchKey {
    module: string
    enterprise: string
    office: string
  }

  const DEBOUNCE_TIME = 1000
  const EXPORT_URL = `${BASE_URL}/schedule-export/report/module-summary?fileType=xlsx`

  export default defineComponent({
    name: 'ModuleCompletionSingular',
    components: {
      TableWithSort,
      CalendarComponent,
      VueMultiselect,
      ScheduleModal,
      ProgressBar,
      Tooltip,
      ReportHeader,
    },
    setup() {
      const store = useLoggedInUserStore()

      const route = computed(() => store.route)

      const updateRoute = (event: Event) => {
        store.updateRoute((event.currentTarget as HTMLInputElement).value)
        saveUserSelectedRoute((event.currentTarget as HTMLInputElement).value)
      }

      const enrollmentDatePicker = ref()
      const completionDatePicker = ref()

      const loading = ref(true)
      const isMoreDataLoading = ref(false)
      const afterKey = ref<ModuleCompletionSummaryReportAfterKey>()

      const hasError = ref(false)
      const { isReportDownloading } = storeToRefs(store)
      const showProgress = ref(false)

      const currentUser = computed(() => store.currentUser)

      const selectedModules = ref<Array<OSModule>>([])
      const selectedEnterprises = ref<Array<OSEnterprise>>([])
      const selectedOffices = ref<Array<OSOffice>>([])

      const selectedEnrollmentDate = ref<Date[]>([])
      const selectedCompletionDate = ref<Date[]>([])

      const columns: TableColumns[] = [
        { id: 'id', label: 'Module ID' },
        { id: 'moduleName', label: 'Module Name' },
        { id: 'enrolled', label: 'Enrolled', isNumerical: true },
        { id: 'notStarted', label: 'Not Started', isNumerical: true },
        { id: 'inProgress', label: 'In Progress', isNumerical: true },
        { id: 'completed', label: 'Completed', isNumerical: true },
        { id: 'views', label: 'Views', isNumerical: true },
      ]

      const moduleCustomLabel = (module: OSModule) =>
        module.title ?? module.name

      const records = ref<
        Array<ModuleCompletion> | Array<Record<never, never>>
      >([])
      const currentRecordsCount = ref(0)

      const enterprises = ref<Array<OSEnterprise>>([])
      const offices = ref<Array<OSOffice>>([])
      const modules = ref<Array<OSModule>>([])
      const filter = ref<Filter>({})

      const dropdownLoader = ref<DropdownLoader>({
        isOfficeLoading: false,
        isEnterpriseLoading: false,
        isModuleLoading: false,
      })

      const dropdownStatus = ref<DropdownStatus>({
        isEnterpriseDisabled: true,
        isOfficeDisabled: true,
      })

      const searchKeys = ref<SearchKey>({
        module: '',
        office: '',
        enterprise: '',
      })

      const updateFilterCookie = (newFilters: typeof filterChoices.value) => {
        setCurrentUserFilters(
          MODULE_SUMMARY_FILTER_CHOICES,
          newFilters,
          currentUser
        )
      }

      const getEnterprises = async (search?: string) => {
        const trimmedSearchTerm = search?.trim()
        searchKeys.value.enterprise = trimmedSearchTerm || ''

        if (!trimmedSearchTerm || trimmedSearchTerm.length < 3) {
          enterprises.value = []
          return
        }

        dropdownLoader.value.isEnterpriseLoading = true

        try {
          const res = await fetchEnterprisesWithModuleEnrollments({
            search: trimmedSearchTerm,
          })
          enterprises.value = res.data.data
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.filters.enterprisesFetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          dropdownLoader.value.isEnterpriseLoading = false
        }
      }

      const getOffices = async (search?: string) => {
        const trimmedSearchTerm = search?.trim()
        searchKeys.value.office = trimmedSearchTerm || ''

        if (!trimmedSearchTerm || trimmedSearchTerm.length < 3) {
          offices.value = []
          return
        }

        dropdownLoader.value.isOfficeLoading = true
        try {
          const res = await fetchOfficesWithModuleEnrollments({
            search: trimmedSearchTerm,
          })
          offices.value = res.data.data
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.filters.officesFetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          dropdownLoader.value.isOfficeLoading = false
        }
      }

      const getModules = async (search?: string) => {
        const trimmedSearchTerm = search?.trim()
        searchKeys.value.module = trimmedSearchTerm || ''

        if (!trimmedSearchTerm || trimmedSearchTerm.length < 3) {
          modules.value = []
          return
        }

        dropdownLoader.value.isModuleLoading = true
        try {
          const res = await fetchModules({ search: trimmedSearchTerm })
          modules.value = res.data.data
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.filters.modulesFetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          dropdownLoader.value.isModuleLoading = false
        }
      }

      const debouncedGetOffices = debounce(DEBOUNCE_TIME, getOffices)
      const debouncedGetEnterprises = debounce(DEBOUNCE_TIME, getEnterprises)
      const debouncedGetModules = debounce(DEBOUNCE_TIME, getModules)

      const sortable = ref<Record<string, Sort>>({
        // enrolled: Sort.default,
        // completed: Sort.default,
        // experienced: Sort.default,
        // sent: Sort.default,
        // lastAccessedAt: Sort.default,
      })

      const changeSearch = (
        key: string,
        value: string | number | DateFilter | Array<FilterObject>
      ) => {
        filter.value = {
          ...filter.value,
          [key]: value,
        }
      }

      const handleModuleSearch = (searchKey: string) => {
        changeSearch('module', searchKey)
        getModuleSummaryReport()
      }

      const handleDateRangeSelect = (key: string, dates: Date[]) => {
        const dateFilter: DateFilter = {}
        if (dates?.[0]) {
          dateFilter.from = dates[0]
        }
        if (dates?.[1]) {
          dateFilter.to = dates[1]
        }

        if (key === 'enrollmentDate') {
          selectedEnrollmentDate.value = dates
        } else if (key === 'completionDate') {
          selectedCompletionDate.value = dates
        }

        changeSearch(key, dateFilter)
      }

      const handleSort = (sort: {
        sortable: typeof sortable.value
        sortKey: string
      }) => {
        sortable.value = sort.sortable
      }

      const openSearchCompatibleSort = computed(() => {
        return getOpenSearchCompatibleSort(sortable.value)
      })

      const getModuleSummaryReport = async () => {
        loading.value = true
        hasError.value = false
        try {
          const res = await fetchModuleSummaryReport({
            sort: openSearchCompatibleSort.value,
            filter: {
              ...filter.value,
            },
            paginate: {
              limit: getDynamicPaginationLimit(),
            },
          })
          loading.value = false
          hasError.value = false
          records.value = res.data.data.body
          currentRecordsCount.value = res.data.data.body.length
          afterKey.value = res.data.data.afterKey
        } catch (e: unknown) {
          loading.value = false
          hasError.value = true
          displayToast(
            getLocalizedText('alert.moduleSummary.fetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        }
      }

      const downloadReport = async (fileType: ExportFileType) => {
        store.updateReportDownloadingStatus(true)

        try {
          const res = await exportModuleSummaryReport(
            {
              sort: openSearchCompatibleSort.value,
              filter: {
                ...filter.value,
              },
            },
            fileType
          )

          downloadBlobFile(
            `${EXPORT_REPORTS_PREFIX}Module_Enrollment_Summary.${fileType}`,
            res.data.data
          )
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.moduleSummary.reportFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          store.updateReportDownloadingStatus(false)
        }
      }

      const goBack = () => {
        window.parent.postMessage('bl-reports-close', '*')
      }

      const debouncedSummaryReport = debounce(
        DEBOUNCE_TIME,
        getModuleSummaryReport
      )

      const handlePageChange = (newPage: number) => {
        getModuleSummaryReport()
      }

      const filterChoices = computed(() => {
        const moduleData = selectedModules.value.map((module) => ({
          id: module.id,
          name: module.title ?? module.name,
          type: DropdownFilterTypes.MODULE,
        }))
        const officesData = selectedOffices.value.map((office) => ({
          id: office.id,
          name: office.name,
          type: DropdownFilterTypes.OFFICE,
        }))
        const enterpriseData = selectedEnterprises.value.map((enterprise) => ({
          id: enterprise.id,
          name: enterprise.name,
          type: DropdownFilterTypes.ENTERPRISE,
        }))
        const enrollmentDateData = {
          date: selectedEnrollmentDate.value,
          type: DropdownFilterTypes.ENROLLMENT_DATE,
        }
        const completionDateData = {
          date: selectedCompletionDate.value,
          type: DropdownFilterTypes.COMPLETION_DATE,
        }
        return [
          ...moduleData,
          ...officesData,
          ...enterpriseData,
          enrollmentDateData,
          completionDateData,
        ]
      })
      const isMoreDataAvailable = computed(() => {
        return getDynamicPaginationLimit() === currentRecordsCount.value
      })

      watch(sortable, getModuleSummaryReport)

      watch(selectedModules, (modules) => {
        const selectedModuleIds = modules.map((module) => {
          return { id: module.id, name: module.title ?? module.name }
        })
        changeSearch('modules', selectedModuleIds)
      })

      watch(selectedEnterprises, (enterprises) => {
        const selectedEnterpriseIds = enterprises.map((enterprise) => {
          return { id: enterprise.id, name: enterprise.name }
        })
        changeSearch('enterprises', selectedEnterpriseIds)
      })

      watch(selectedOffices, (offices) => {
        const selectedOfficeIds = offices.map((office) => {
          return { id: office.id, name: office.name }
        })
        changeSearch('offices', selectedOfficeIds)
      })

      const loadMore = async () => {
        if (isMoreDataLoading.value || !isMoreDataAvailable.value) {
          return
        }
        isMoreDataLoading.value = true
        const res = await fetchModuleSummaryReport({
          sort: openSearchCompatibleSort.value,
          filter: {
            ...filter.value,
          },
          paginate: {
            limit: getDynamicPaginationLimit(),
          },
          afterKey: afterKey.value,
        })

        afterKey.value = res.data.data.afterKey
        records.value.push(...res.data.data.body)
        currentRecordsCount.value = res.data.data.body.length
        isMoreDataLoading.value = false
      }

      watch(isMoreDataAvailable, loadMore)

      const resetFilters = () => {
        selectedModules.value = []
        selectedOffices.value = []
        selectedEnterprises.value = []
        selectedEnrollmentDate.value = []
        selectedCompletionDate.value = []
        enrollmentDatePicker.value.resetDate()
        completionDatePicker.value.resetDate()
      }

      const isFilterSelected = computed(() => {
        return (
          selectedModules.value.length ||
          selectedOffices.value.length ||
          selectedEnterprises.value.length ||
          filter.value['enrollmentDate']?.from ||
          filter.value['completionDate']?.from
        )
      })

      watch(filter, debouncedSummaryReport)

      watch(filterChoices, updateFilterCookie)

      onBeforeMount(() => {
        const currentFilters = getCurrentUserFilters(
          MODULE_SUMMARY_FILTER_CHOICES,
          filterChoices,
          currentUser
        )

        if (currentFilters && Array.isArray(currentFilters)) {
          const moduleFilters: typeof selectedModules.value = []
          const officeFilters: typeof selectedOffices.value = []
          const enterpriseFilters: typeof selectedEnterprises.value = []
          let enrollmentDateFilters: Date[] = []
          let completionDateFilters: Date[] = []
          currentFilters.forEach((filter) => {
            const { type, ...newFilter } = filter
            if (type === DropdownFilterTypes.MODULE) {
              moduleFilters.push(newFilter as OSModule)
            } else if (type === DropdownFilterTypes.OFFICE) {
              officeFilters.push(newFilter as OSOffice)
            } else if (type === DropdownFilterTypes.ENTERPRISE) {
              enterpriseFilters.push(newFilter as OSEnterprise)
            } else if (type === DropdownFilterTypes.ENROLLMENT_DATE) {
              enrollmentDateFilters = (newFilter as DateFilterChoice).date
            } else if (type === DropdownFilterTypes.COMPLETION_DATE) {
              completionDateFilters = (newFilter as DateFilterChoice).date
            }
          })
          selectedOffices.value = officeFilters
          selectedEnterprises.value = enterpriseFilters
          selectedModules.value = moduleFilters

          selectedEnrollmentDate.value = enrollmentDateFilters
          selectedCompletionDate.value = completionDateFilters

          const enrollmentDateFiltersObj: DateFilter = {}
          const completionDateFiltersObj: DateFilter = {}

          if (enrollmentDateFilters?.[0]) {
            enrollmentDateFiltersObj.from = enrollmentDateFilters[0]
          }
          if (enrollmentDateFilters?.[1]) {
            enrollmentDateFiltersObj.to = enrollmentDateFilters[1]
          }

          if (completionDateFilters?.[0]) {
            completionDateFiltersObj.from = completionDateFilters[0]
          }
          if (completionDateFilters?.[1]) {
            completionDateFiltersObj.to = completionDateFilters[1]
          }

          filter.value = {
            enrollmentDate: enrollmentDateFiltersObj,
            completionDate: completionDateFiltersObj,
          }
        } else {
          getModuleSummaryReport()
        }

        restrictDropdownsByUserRole(dropdownStatus)
      })

      const showModal = ref(false)
      const updateModalStatus = (status: boolean) => {
        showModal.value = status
      }

      function handleSchedulePreSave() {
        updateModalStatus(false)
        showProgress.value = true
      }

      function handleSave() {
        showProgress.value = false
        store.updateSelectedTab(Pages.SCHEDULED_REPORTS)
      }

      function handleModalError() {
        showProgress.value = false
      }

      function goToDetail(moduleDetail: { id: number; name: string }) {
        store.goToIndividualModule({
          ...moduleDetail,
          type: DropdownFilterTypes.MODULE,
        })
      }

      return {
        loading,
        columns,
        records,
        sortable,
        enterprises,
        offices,
        modules,
        searchKeys,
        dropdownLoader,
        dropdownStatus,
        debouncedGetOffices,
        debouncedGetEnterprises,
        debouncedGetModules,
        selectedModules,
        selectedEnterprises,
        selectedOffices,
        handleModuleSearch,
        loadMore,
        handleDateRangeSelect,
        handleSort,
        handlePageChange,
        getSpacedDate,
        isMoreDataAvailable,
        filterChoices,
        moduleCustomLabel,
        route,
        updateRoute,
        currentRecordsCount,
        downloadReport,
        goBack,
        isReportDownloading,
        isMoreDataLoading,
        showModal,
        updateModalStatus,
        EXPORT_URL,
        filter,
        showProgress,
        progressBarText: PROGRESS_BAR_HEADER.DEFAULT,
        handleSchedulePreSave,
        handleSave,
        isFilterSelected,
        resetFilters,
        goToDetail,
        enrollmentDatePicker,
        completionDatePicker,
        REPORT_ROUTES: REPORT_ROUTES,
        getLocalizedText,
        selectedEnrollmentDate,
        selectedCompletionDate,
        handleModalError,
      }
    },
  })
</script>
