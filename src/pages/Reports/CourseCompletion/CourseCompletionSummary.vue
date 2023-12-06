<template>
  <div class="row no-w" data-test="course-completion-summary">
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
          <div class="row justify-content-between gy-4">
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
                >Course
                <span class="sub-text">
                  ({{ selectedCourses.length || 'All' }})
                </span></label
              >
              <VueMultiselect
                v-model="selectedCourses"
                :options="courses"
                :multiple="true"
                :close-on-select="false"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
                label="name"
                track-by="id"
                list="courseOptions"
                :searchable="true"
                :loading="dropdownLoader.isCourseLoading"
                :internal-search="false"
                :select-label="getLocalizedText('message.filters.searchSelect')"
                :clear-on-select="false"
                :options-limit="300"
                :max-height="600"
                :hide-selected="true"
                :show-labels="false"
                @search-change="debouncedGetCourses"
              >
                <template #noResult>
                  <template v-if="searchKeys.course.length < 3">
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
              <label for="formFile" class="form-label">Enrollment Date</label>
              <calendar-component
                id="formFile"
                ref="enrollmentDatePicker"
                class="custom-class"
                :initial-date="selectedEnrollmentDate"
                @range:select="(date: Date[]) => handleDateRangeSelect('enrollmentDate', date)"
              />
            </div>
            <div class="col-12">
              <label for="formFile" class="form-label">Completion Date</label>
              <calendar-component
                id="formFile"
                ref="completionDatePicker"
                :initial-date="selectedCompletionDate"
                @range:select="(date: Date[]) => handleDateRangeSelect('completionDate', date)"
              />
            </div>
            <div class="col-12">
              <label for="formFile" class="form-label"
                >Enterprise
                <span
                  v-if="!dropdownStatus.isEnterpriseDisabled"
                  data-test="enterprise-label"
                  class="sub-text"
                  >({{ selectedEnterprises.length || 'All' }})</span
                ></label
              >
              <VueMultiselect
                v-model="selectedEnterprises"
                :options="enterprises"
                :multiple="true"
                :close-on-select="false"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
                label="name"
                track-by="id"
                list="enterpriseOptions"
                :disabled="dropdownStatus.isEnterpriseDisabled"
                :searchable="true"
                :loading="dropdownLoader.isEnterpriseLoading"
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
                :options="offices"
                :multiple="true"
                :close-on-select="false"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
                label="name"
                track-by="id"
                list="officeOptions"
                :disabled="dropdownStatus.isOfficeDisabled"
                :searchable="true"
                :loading="dropdownLoader.isOfficeLoading"
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
          @sort="handleSort"
          @load-more="loadMore"
        >
          <template #enrollmentCompletion="scope">
            {{ `${(scope.enrollmentCompletion * 100).toFixed(0)} %` }}
          </template>
          <template #name="scope">
            <Tooltip :message="scope.name" :wrap-text="true"
              ><a
                class="link-dark cursor-pointer"
                @click="goToDetail({ id: scope.id, name: scope.name })"
                >{{ scope.name }}
              </a></Tooltip
            >
          </template>
        </table-with-sort>
      </div>
    </div>
  </div>
  <schedule-modal
    :report="{
      title: getLocalizedText('message.navbar.courseCompletionSummary'),
      url: EXPORT_URL,
      filter: filter,
    }"
    :show="showModal"
    @close="() => updateModalStatus(false)"
    @save="handleSave"
    @pre-save="handleSchedulePreSave"
    @error="handleModalError"
  ></schedule-modal>
  <progress-bar :show="showProgress">
    <template #header
      ><h5 class="modal-title">{{ progressBarText }}</h5></template
    >
  </progress-bar>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, computed, onBeforeMount } from 'vue'

  import VueMultiselect from 'vue-multiselect'
  import { debounce } from 'lodash/fp'
  import ReportHeader from '@/components/common/ReportHeader.vue'

  import TableWithSort from '@/components/common/TableWithSort.vue'
  import CalendarComponent from '@/components/common/CalendarComponent.vue'
  import { Sort } from '@/types/table'
  import { TableColumns } from '@/types/table'
  import {
    fetchCoursesList,
    fetchCourseSummaryReport,
    fetchOfficesWithCourseEnrollments,
    fetchEnterprisesWithCourseEnrollments,
    exportCourseSummaryReport,
  } from '@/api/calls'
  import { displayToast } from '@/utils/show-toast'
  import { getOpenSearchCompatibleSort } from '@/utils/os-compatible-sort'
  import { Variant } from '@/types/toast'
  import {
    CourseCompletion,
    CourseCompletionSummaryReportAfterKey,
    OSCourse,
    OSEnterprise,
    OSOffice,
  } from './types'
  import { DateFilter, ExportFileType, FilterObject } from '../types'

  import { Filter } from '@/types/filter'
  import { getSpacedDate } from '@/utils/date'
  import { COURSE_SUMMARY_FILTER_CHOICES } from '@/constants/auth'
  import { DropdownStatus } from '@/types/report'
  import {
    restrictDropdownsByUserRole,
    getCurrentUserFilters,
    setCurrentUserFilters,
    DropdownFilterTypes,
    DateFilterChoice,
    downloadBlobFile,
    getDynamicPaginationLimit,
  } from '@/utils/reports'
  import { Pages, useLoggedInUserStore } from '@/store'
  import ProgressBar from '@/components/common/ProgressBar.vue'

  import ScheduleModal from '@/pages/Reports/ScheduledReports/Modal.vue'
  import { BASE_URL } from '@/utils/http'
  import { PROGRESS_BAR_HEADER, REPORT_ROUTES } from '../constants'
  import Tooltip from '@/components/common/Tooltip.vue'
  import { EXPORT_REPORTS_PREFIX } from '../ScheduledReports/constants'
  import { getLocalizedText } from '@/utils/util'
  import { storeToRefs } from 'pinia'
  import { saveUserSelectedRoute } from '@/utils/user'

  interface DropdownLoader {
    isCourseLoading: boolean
    isEnterpriseLoading: boolean
    isOfficeLoading: boolean
  }

  interface SearchKey {
    course: string
    enterprise: string
    office: string
  }

  const DEBOUNCE_TIME = 1000

  const EXPORT_URL = `${BASE_URL}/schedule-export/report/course-summary?fileType=xlsx`

  export default defineComponent({
    name: 'CourseCompletionsReport',
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

      const loading = ref(true)
      const isMoreDataLoading = ref(false)

      const afterKey = ref<CourseCompletionSummaryReportAfterKey>()

      const hasError = ref(false)
      const { isReportDownloading } = storeToRefs(store)
      const showProgress = ref(false)

      const currentUser = computed(() => store.currentUser)
      const selectedCourses = ref<Array<OSCourse>>([])
      const selectedEnterprises = ref<Array<OSEnterprise>>([])
      const selectedOffices = ref<Array<OSOffice>>([])

      const selectedEnrollmentDate = ref<Date[]>([])
      const selectedCompletionDate = ref<Date[]>([])

      const columns: TableColumns[] = [
        { id: 'id', label: 'Course ID' },
        { id: 'name', label: 'Course Name' },
        { id: 'enrolled', label: 'Currently Enrolled', isNumerical: true },
        { id: 'notStarted', label: 'Not Started', isNumerical: true },
        { id: 'inProgress', label: 'In Progress', isNumerical: true },
        { id: 'completed', label: 'Completed', isNumerical: true },
        {
          id: 'enrollmentCompletion',
          label: 'Completion %',
          isNumerical: true,
        },
      ]

      const records = ref<
        Array<CourseCompletion> | Array<Record<never, never>>
      >([])
      const currentRecordsCount = ref(0)

      const enterprises = ref<Array<OSEnterprise>>([])
      const offices = ref<Array<OSOffice>>([])
      const courses = ref<Array<OSCourse>>([])
      const filter = ref<Filter>({})

      const dropdownLoader = ref<DropdownLoader>({
        isCourseLoading: false,
        isEnterpriseLoading: false,
        isOfficeLoading: false,
      })

      const dropdownStatus = ref<DropdownStatus>({
        isEnterpriseDisabled: true,
        isOfficeDisabled: true,
      })

      const isMoreDataAvailable = computed(() => {
        return getDynamicPaginationLimit() === currentRecordsCount.value
      })

      const searchKeys = ref<SearchKey>({
        course: '',
        office: '',
        enterprise: '',
      })

      const loadMore = async () => {
        if (isMoreDataLoading.value || !isMoreDataAvailable.value) {
          return
        }
        isMoreDataLoading.value = true
        const res = await fetchCourseSummaryReport({
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

      const updateFilterCookie = (newFilters: typeof filterChoices.value) => {
        setCurrentUserFilters(
          COURSE_SUMMARY_FILTER_CHOICES,
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
          const res = await fetchEnterprisesWithCourseEnrollments({
            search: trimmedSearchTerm,
          })
          enterprises.value = res.data.data
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.filters.enterprisesFail'),
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
          const res = await fetchOfficesWithCourseEnrollments({
            search: trimmedSearchTerm,
          })
          offices.value = res.data.data
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.filters.officesFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          dropdownLoader.value.isOfficeLoading = false
        }
      }

      const getCourses = async (search?: string) => {
        const trimmedSearchTerm = search?.trim()
        searchKeys.value.course = trimmedSearchTerm || ''
        if (!trimmedSearchTerm || trimmedSearchTerm.length < 3) {
          courses.value = []
          return
        }

        dropdownLoader.value.isCourseLoading = true
        try {
          const res = await fetchCoursesList({ search: trimmedSearchTerm })
          courses.value = res.data.data
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.filters.coursesFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          dropdownLoader.value.isCourseLoading = false
        }
      }

      const enrollmentDatePicker = ref()
      const completionDatePicker = ref()

      const debouncedGetOffices = debounce(DEBOUNCE_TIME, getOffices)
      const debouncedGetEnterprises = debounce(DEBOUNCE_TIME, getEnterprises)
      const debouncedGetCourses = debounce(DEBOUNCE_TIME, getCourses)

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
        changeSearch('modules', searchKey)
        getCourseSummaryReport()
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

      const getCourseSummaryReport = async () => {
        loading.value = true
        hasError.value = false
        try {
          const res = await fetchCourseSummaryReport({
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
            getLocalizedText('alert.courseSummary.fetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        }
      }

      const debouncedSummaryReport = debounce(
        DEBOUNCE_TIME,
        getCourseSummaryReport
      )

      const downloadReport = async (fileType: ExportFileType) => {
        store.updateReportDownloadingStatus(true)
        try {
          const res = await exportCourseSummaryReport(
            {
              sort: openSearchCompatibleSort.value,
              filter: {
                ...filter.value,
              },
            },
            fileType
          )

          downloadBlobFile(
            `${EXPORT_REPORTS_PREFIX}Course_Enrollment_Summary.${fileType}`,
            res.data.data
          )
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.courseSummary.reportFail'),
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

      const filterChoices = computed(() => {
        const courseData = selectedCourses.value.map((course) => ({
          id: course.id,
          name: course.name,
          type: DropdownFilterTypes.COURSE,
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
          ...courseData,
          ...officesData,
          ...enterpriseData,
          enrollmentDateData,
          completionDateData,
        ]
      })

      watch(sortable, getCourseSummaryReport)

      watch(selectedCourses, (courses) => {
        const selectedCourseIds = courses.map((course) => {
          return { id: course.id, name: course.name }
        })
        changeSearch('courses', selectedCourseIds)
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

      watch(filter, debouncedSummaryReport)

      watch(filterChoices, updateFilterCookie)

      const resetFilters = () => {
        selectedCourses.value = []
        selectedOffices.value = []
        selectedEnterprises.value = []
        selectedEnrollmentDate.value = []
        selectedCompletionDate.value = []
        enrollmentDatePicker.value.resetDate()
        completionDatePicker.value.resetDate()
      }

      const isFilterSelected = computed(() => {
        return (
          selectedCourses.value.length ||
          selectedOffices.value.length ||
          selectedEnterprises.value.length ||
          filter.value['enrollmentDate']?.from ||
          filter.value['completionDate']?.from
        )
      })

      onBeforeMount(() => {
        const currentFilters = getCurrentUserFilters(
          COURSE_SUMMARY_FILTER_CHOICES,
          filterChoices,
          currentUser
        )

        if (currentFilters && Array.isArray(currentFilters)) {
          const courseFilters: typeof selectedCourses.value = []
          const officeFilters: typeof selectedOffices.value = []
          const enterpriseFilters: typeof selectedEnterprises.value = []
          let enrollmentDateFilters: Date[] = []
          let completionDateFilters: Date[] = []
          currentFilters.forEach((filter) => {
            const { type, ...newFilter } = filter
            if (type === DropdownFilterTypes.COURSE) {
              courseFilters.push(newFilter as OSCourse)
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
          selectedCourses.value = courseFilters

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
          getCourseSummaryReport()
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

      function goToDetail(courseDetail: { id: number; name: string }) {
        store.goToIndividualCourse({
          ...courseDetail,
          type: DropdownFilterTypes.COURSE,
        })
      }

      return {
        loading,
        columns,
        records,
        sortable,
        enterprises,
        offices,
        courses,
        handleModuleSearch,
        handleDateRangeSelect,
        handleSort,
        getSpacedDate,
        selectedCourses,
        selectedEnterprises,
        selectedOffices,
        debouncedGetOffices,
        debouncedGetEnterprises,
        debouncedGetCourses,
        dropdownLoader,
        dropdownStatus,
        searchKeys,
        filter,
        filterChoices,
        route,
        updateRoute,
        downloadReport,
        goBack,
        isReportDownloading,
        isMoreDataLoading,
        hasError,
        updateModalStatus,
        loadMore,
        showModal,
        EXPORT_URL,
        showProgress,
        progressBarText: PROGRESS_BAR_HEADER.DEFAULT,
        handleSchedulePreSave,
        handleSave,
        isFilterSelected,
        resetFilters,
        enrollmentDatePicker,
        completionDatePicker,
        goToDetail,
        REPORT_ROUTES: REPORT_ROUTES,
        getLocalizedText,
        selectedEnrollmentDate,
        selectedCompletionDate,
        handleModalError,
      }
    },
  })
</script>
