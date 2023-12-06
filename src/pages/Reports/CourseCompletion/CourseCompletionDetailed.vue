<template>
  <div class="row no-w" data-test="course-completion-detailed">
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
                >User
                <span class="sub-text">
                  ({{ selectedUsers.length || 'All' }})
                </span></label
              >
              <VueMultiselect
                v-model="selectedUsers"
                :options="userFilterChoices"
                :multiple="true"
                :close-on-select="false"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
                label="name"
                track-by="id"
                list="userOptions"
                :searchable="true"
                :loading="dropdownLoader.isUserLoading"
                :internal-search="false"
                :select-label="getLocalizedText('message.filters.searchSelect')"
                :clear-on-select="false"
                :options-limit="300"
                :max-height="600"
                :hide-selected="true"
                :show-labels="false"
                @search-change="debouncedGetUsers"
              >
                <template #option="scope">
                  {{ scope.option.name }}
                </template>
                <template #noResult>
                  <template v-if="searchKeys.user.length < 3">
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
              <label for="formFile" class="form-label">Completion Date</label>
              <calendar-component
                id="formFile"
                ref="completionDatePicker"
                :initial-date="selectedCompletionDate"
                @range:select="(date: Date[]) => handleDateRangeSelect('completionDate', date)"
              />
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
              <label for="formFile" class="form-label">Due Date</label>
              <calendar-component
                id="formFile"
                ref="dueDatePicker"
                class="custom-class"
                :initial-date="selectedDueDate"
                @range:select="(date: Date[]) => handleDateRangeSelect('dueDate', date)"
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
                :searchable="true"
                :disabled="dropdownStatus.isOfficeDisabled"
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
          @load-more="loadMore"
          @sort="handleSort"
        >
          <template #completionPercent="scope">
            {{ `${scope.completionPercent.toFixed(0)} %` }}
          </template>
          <template #firstName="scope">
            <Tooltip :message="scope.firstName" :wrap-text="true">{{
              scope.firstName
            }}</Tooltip>
          </template>

          <template #lastName="scope">
            <Tooltip :message="scope.lastName" :wrap-text="true">{{
              scope.lastName
            }}</Tooltip>
          </template>
          <template #emailID="scope">
            <Tooltip :message="scope.emailID" :wrap-text="true">{{
              scope.emailID
            }}</Tooltip>
          </template>
          <template #currentEnterprise="scope">
            <Tooltip :message="scope.currentEnterprise" :wrap-text="true">{{
              scope.currentEnterprise
            }}</Tooltip>
          </template>
          <template #currentOffice="scope">
            <Tooltip :message="scope.currentOffice" :wrap-text="true">{{
              scope.currentOffice
            }}</Tooltip>
          </template>
          <template #currentLearnerGroup="scope">
            <Tooltip :message="scope.currentLearnerGroup" :wrap-text="true">{{
              scope.currentLearnerGroup
            }}</Tooltip>
          </template>
          <template #courseName="scope">
            <Tooltip :message="scope.courseName" :wrap-text="true">{{
              scope.courseName
            }}</Tooltip>
          </template>
          <template #coursePath="scope">
            <Tooltip :message="scope.coursePath" :wrap-text="true">{{
              scope.coursePath
            }}</Tooltip>
          </template>
        </table-with-sort>
      </div>
    </div>
  </div>
  <schedule-modal
    :report="{
      title: getLocalizedText('message.navbar.courseCompletionDetailed'),
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
  import { Placement } from '@/types/tooltip'

  import VueMultiselect from 'vue-multiselect'

  import TableWithSort from '@/components/common/TableWithSort.vue'
  import CalendarComponent from '@/components/common/CalendarComponent.vue'
  import ReportHeader from '@/components/common/ReportHeader.vue'

  import { debounce } from 'lodash/fp'

  import { DateFilter, ExportFileType, FilterObject } from '../types'
  import {
    exportCourseDetailsReport,
    fetchCourseCompletionReport,
    fetchCoursesList,
    fetchEnterprisesWithCourseEnrollments,
    fetchOfficesWithCourseEnrollments,
    fetchUsersWithCourseEnrollments,
  } from '@/api/calls'
  import { displayToast } from '@/utils/show-toast'
  import { getOpenSearchCompatibleSort } from '@/utils/os-compatible-sort'
  import { Variant } from '@/types/toast'
  import { Sort, TableColumns } from '@/types/table'
  import {
    CourseCompletionDetailed,
    OSCourse,
    OSEnterprise,
    OSOffice,
    OSUser,
  } from './types'
  import { getSpacedDate } from '@/utils/date'
  import { Filter } from '@/types/filter'
  import usePagination from '@/composables/pagination'
  import { COURSE_DETAILED_FILTER_CHOICES } from '@/constants/auth'
  import {
    DateFilterChoice,
    downloadBlobFile,
    DropdownFilterTypes,
    FilterChoice,
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
  import Tooltip from '@/components/common/Tooltip.vue'
  import { EXPORT_REPORTS_PREFIX } from '../ScheduledReports/constants'
  import { getLocalizedText } from '@/utils/util'
  import { storeToRefs } from 'pinia'
  import { saveUserSelectedRoute } from '@/utils/user'

  interface DropdownLoader {
    isCourseLoading: boolean
    isEnterpriseLoading: boolean
    isOfficeLoading: boolean
    isUserLoading: boolean
  }

  interface SearchKey {
    course: string
    enterprise: string
    office: string
    user: string
  }

  const DEBOUNCE_TIME = 1000

  const EXPORT_URL = `${BASE_URL}/schedule-export/report/course-details?fileType=xlsx`

  export default defineComponent({
    name: 'CourseCompletionsReport',
    components: {
      TableWithSort,
      CalendarComponent,
      VueMultiselect,
      ReportHeader,
      ScheduleModal,
      ProgressBar,
      Tooltip,
    },
    props: {
      id: {
        type: String,
        required: false,
        default: '',
      },
    },
    setup(props, ctx) {
      const { paginationParam, pagination, setTotalPages, resetPagination } =
        usePagination({
          currentPage: 1,
          totalPages: 1,
          perPage: getDynamicPaginationLimit(),
        })

      const store = useLoggedInUserStore()

      const currentUser = computed(() => store.currentUser)

      const redirectMode = ref(false)

      const route = computed(() => store.route)
      const showProgress = ref(false)

      const updateRoute = (event: Event) => {
        store.updateRoute((event.currentTarget as HTMLInputElement).value)
        saveUserSelectedRoute((event.currentTarget as HTMLInputElement).value)
      }

      const loading = ref(true)
      const isMoreDataAvailable = computed(() => {
        return getDynamicPaginationLimit() === currentRecordsCount.value
      })
      const isMoreDataLoading = ref(false)

      const hasError = ref(false)

      const { isReportDownloading } = storeToRefs(store)

      const completionDatePicker = ref()
      const enrollmentDatePicker = ref()
      const dueDatePicker = ref()

      const selectedCourses = ref<Array<OSCourse>>([])
      const selectedEnterprises = ref<Array<OSEnterprise>>([])
      const selectedOffices = ref<Array<OSOffice>>([])
      const selectedUsers = ref<Array<FilterChoice>>([])

      const selectedEnrollmentDate = ref<Date[]>([])
      const selectedCompletionDate = ref<Date[]>([])
      const selectedDueDate = ref<Date[]>([])

      const dropdownLoader = ref<DropdownLoader>({
        isCourseLoading: false,
        isEnterpriseLoading: false,
        isOfficeLoading: false,
        isUserLoading: false,
      })

      const dropdownStatus = ref<DropdownStatus>({
        isEnterpriseDisabled: true,
        isOfficeDisabled: true,
      })

      const searchKeys = ref<SearchKey>({
        course: '',
        office: '',
        enterprise: '',
        user: '',
      })

      const columns: TableColumns[] = [
        {
          id: 'userID',
          label: 'User ID',
        },
        {
          id: 'firstName',
          label: 'First Name',
        },
        {
          id: 'lastName',
          label: 'Last Name',
        },
        {
          id: 'emailID',
          label: 'Email ID',
        },
        {
          id: 'currentEnterprise',
          label: 'Current Enterprise',
        },
        {
          id: 'currentOffice',
          label: 'Current Office',
        },
        {
          id: 'currentLearnerGroup',
          label: 'Current Learner Group',
        },
        {
          id: 'coursePath',
          label: 'Course Path',
        },
        {
          id: 'courseName',
          label: 'Course Name',
        },
        {
          id: 'enrollmentDate',
          label: 'Enrollment Date',
        },
        {
          id: 'dueDate',
          label: 'Due Date',
        },
        {
          id: 'numberOfModules',
          label: 'No of Modules',
          isNumerical: true,
        },
        {
          id: 'completedModules',
          label: 'Completed Modules',
          isNumerical: true,
        },
        {
          id: 'completionPercent',
          label: 'Completion %',
          isNumerical: true,
        },
        {
          id: 'completionStatus',
          label: 'Completion Status',
        },
        {
          id: 'completionDate',
          label: 'Completion Date',
        },
      ]

      const sortable = ref<Record<string, Sort>>({
        // enrolled: Sort.default,
        // completed: Sort.default,
        // experienced: Sort.default,
        // sent: Sort.default,
        // lastAccessedAt: Sort.default,
      })

      const records = ref<
        Array<CourseCompletionDetailed> | Array<Record<never, never>>
      >([])

      const currentRecordsCount = ref(0)

      const updateFilterCookie = (newFilters: typeof filterChoices.value) => {
        setCurrentUserFilters(
          COURSE_DETAILED_FILTER_CHOICES,
          newFilters,
          currentUser
        )
      }

      const filterChoices = computed(() => {
        const courseData = selectedCourses.value.map((course) => ({
          ...course,
          type: DropdownFilterTypes.COURSE,
        }))
        const officesData = selectedOffices.value.map((office) => ({
          ...office,
          type: DropdownFilterTypes.OFFICE,
        }))
        const enterpriseData = selectedEnterprises.value.map((enterprise) => ({
          ...enterprise,
          type: DropdownFilterTypes.ENTERPRISE,
        }))
        const userData: Array<FilterChoice> = selectedUsers.value.map(
          (user) => ({
            id: user.id,
            name: user.name,
            type: DropdownFilterTypes.USER,
          })
        )
        const enrollmentDateData = {
          date: selectedEnrollmentDate.value,
          type: DropdownFilterTypes.ENROLLMENT_DATE,
        }
        const completionDateData = {
          date: selectedCompletionDate.value,
          type: DropdownFilterTypes.COMPLETION_DATE,
        }
        const dueDateData = {
          date: selectedDueDate.value,
          type: DropdownFilterTypes.DUE_DATE,
        }

        return [
          ...courseData,
          ...officesData,
          ...enterpriseData,
          ...userData,
          enrollmentDateData,
          completionDateData,
          dueDateData,
        ]
      })

      const enterprises = ref<Array<OSEnterprise>>([])
      const offices = ref<Array<OSOffice>>([])
      const courses = ref<Array<OSCourse>>([])
      const users = ref<Array<OSUser>>([])

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
          const res = await fetchOfficesWithCourseEnrollments({
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
            getLocalizedText('alert.filters.coursesFetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          dropdownLoader.value.isCourseLoading = false
        }
      }

      const getUsers = async (search?: string) => {
        const trimmedSearchTerm = search?.trim()
        searchKeys.value.user = trimmedSearchTerm || ''
        if (!trimmedSearchTerm || trimmedSearchTerm.length < 3) {
          users.value = []
          return
        }

        dropdownLoader.value.isUserLoading = true

        try {
          const res = await fetchUsersWithCourseEnrollments({
            search: trimmedSearchTerm,
          })
          users.value = res.data.data
        } catch (e: unknown) {
          displayToast(
            getLocalizedText('alert.filters.usersFetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        } finally {
          dropdownLoader.value.isUserLoading = false
        }
      }

      const downloadReport = async (fileType: ExportFileType) => {
        const scheduleCourseDetailedReportUrl = `${BASE_URL}/schedule-export/report/schedule-course-completion-email?fileType=${fileType}`

        store.updateReportDownloadingStatus(true)
        if (isFilterSelected.value) {
          try {
            const { response, source } = exportCourseDetailsReport(
              {
                sort: openSearchCompatibleSort.value,
                filter: {
                  ...filter.value,
                },
              },
              fileType
            )

            const res = await response

            const downloadTimeout = store.handleDownloadFailed(
              filter.value,
              scheduleCourseDetailedReportUrl,
              source
            )

            if (!res) {
              throw new Error('cancelled')
            }

            clearTimeout(downloadTimeout)

            downloadBlobFile(
              `${EXPORT_REPORTS_PREFIX}Course_Enrollment_Details.${fileType}`,
              res.data.data
            )
          } catch (e: any) {
            if (!((e.name as string) !== 'cancelled')) {
              displayToast(
                getLocalizedText('alert.courseDetail.reportFail'),
                Variant.DANGER,
                'Error'
              )
              console.error(e)
            }
          } finally {
            store.updateReportDownloadingStatus(false)
          }
        } else {
          store.handleNoFilterSelected(
            filter.value,
            scheduleCourseDetailedReportUrl
          )
        }
      }

      const goBack = () => {
        window.parent.postMessage('bl-reports-close', '*')
      }

      const userFilterChoices = computed(() =>
        users.value.map((u) => ({
          id: u.id,
          name: `${u.first_name} ${u.last_name}`,
        }))
      )

      const debouncedGetOffices = debounce(DEBOUNCE_TIME, getOffices)
      const debouncedGetEnterprises = debounce(DEBOUNCE_TIME, getEnterprises)
      const debouncedGetCourses = debounce(DEBOUNCE_TIME, getCourses)
      const debouncedGetUsers = debounce(DEBOUNCE_TIME, getUsers)

      const filter = ref<Filter>({})

      const changeSearch = (
        key: string,
        value: string | number | DateFilter | Array<FilterObject>
      ) => {
        filter.value = {
          ...filter.value,
          [key]: value,
        }
        resetPagination()
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
        } else if (key === 'dueDate') {
          selectedDueDate.value = dates
        }

        changeSearch(key, dateFilter)
        resetPagination()
        getCourseDetailedReport()
      }

      const handleSort = (sort: {
        sortable: typeof sortable.value
        sortKey: string
      }) => {
        sortable.value = sort.sortable
        resetPagination()
      }

      const openSearchCompatibleSort = computed(() => {
        return getOpenSearchCompatibleSort(sortable.value)
      })

      const getCourseDetailedReport = async () => {
        loading.value = true
        hasError.value = false
        try {
          const res = await fetchCourseCompletionReport({
            sort: openSearchCompatibleSort.value,
            filter: {
              ...filter.value,
            },
            paginate: {
              limit: paginationParam.value.limit,
              offset: paginationParam.value.skip,
            },
          })
          loading.value = false
          hasError.value = false
          records.value = res.data.data
          currentRecordsCount.value = res.data.data.length
          setTotalPages(res.data.meta)
        } catch (e: unknown) {
          loading.value = false
          hasError.value = true
          displayToast(
            getLocalizedText('alert.courseDetail.fetchFail'),
            Variant.DANGER,
            'Error'
          )
          console.error(e)
        }
      }
      const loadMore = async () => {
        if (isMoreDataLoading.value || !isMoreDataAvailable.value) {
          return
        }
        pagination.value = {
          ...pagination.value,
          currentPage: pagination.value.currentPage + 1,
        }
        isMoreDataLoading.value = true
        const res = await fetchCourseCompletionReport({
          sort: openSearchCompatibleSort.value,
          filter: {
            ...filter.value,
          },
          paginate: {
            limit: paginationParam.value.limit,
            offset: paginationParam.value.skip,
          },
        })
        isMoreDataLoading.value = false
        currentRecordsCount.value = res.data.data.length
        records.value.push(...res.data.data)
      }

      watch(isMoreDataAvailable, loadMore)

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

      watch(selectedUsers, (users) => {
        const selectedUserIds = users.map((user) => {
          return { id: user.id, name: user.name }
        })
        changeSearch('users', selectedUserIds)
      })

      const resetFilters = () => {
        selectedUsers.value = []
        selectedCourses.value = []
        selectedOffices.value = []
        selectedEnterprises.value = []
        selectedEnrollmentDate.value = []
        selectedCompletionDate.value = []
        selectedDueDate.value = []
        enrollmentDatePicker.value.resetDate()
        completionDatePicker.value.resetDate()
        dueDatePicker.value.resetDate()
      }

      const isFilterSelected = computed(() => {
        return (
          selectedUsers.value.length ||
          selectedCourses.value.length ||
          selectedOffices.value.length ||
          selectedEnterprises.value.length ||
          filter.value['enrollmentDate']?.from ||
          filter.value['completionDate']?.from ||
          filter.value['dueDate']?.from
        )
      })

      const debouncedDetailedReport = debounce(
        DEBOUNCE_TIME,
        getCourseDetailedReport
      )

      watch(filter, debouncedDetailedReport)

      watch(filterChoices, (value) => {
        if (redirectMode.value) {
          return
        }
        updateFilterCookie(value)
      })

      onBeforeMount(() => {
        if (store.redirectFilters.length) {
          const redirectFilters = store.redirectFilters
          selectedCourses.value = redirectFilters.map(
            (filter) =>
              ({
                id: filter.id,
                name: filter.name,
              } as OSCourse)
          )
          redirectMode.value = true
          restrictDropdownsByUserRole(dropdownStatus)
          store.resetRedirectfilter()
          return
        }
        const currentFilters = getCurrentUserFilters(
          COURSE_DETAILED_FILTER_CHOICES,
          filterChoices,
          currentUser
        )
        if (currentFilters && Array.isArray(currentFilters)) {
          const courseFilters: typeof selectedCourses.value = []
          const officeFilters: typeof selectedOffices.value = []
          const enterpriseFilters: typeof selectedEnterprises.value = []
          const userFilters: FilterChoice[] = []
          let enrollmentDateFilters: Date[] = []
          let completionDateFilters: Date[] = []
          let dueDateFilters: Date[] = []
          currentFilters.forEach((filter) => {
            const { type, ...newFilter } = filter
            if (type === DropdownFilterTypes.COURSE) {
              courseFilters.push(newFilter as OSCourse)
            } else if (type === DropdownFilterTypes.OFFICE) {
              officeFilters.push(newFilter as OSOffice)
            } else if (type === DropdownFilterTypes.ENTERPRISE) {
              enterpriseFilters.push(newFilter as OSEnterprise)
            } else if (type === DropdownFilterTypes.USER) {
              userFilters.push({
                ...(newFilter as FilterChoice),
                type: DropdownFilterTypes.USER,
              })
            } else if (type === DropdownFilterTypes.ENROLLMENT_DATE) {
              enrollmentDateFilters = (newFilter as DateFilterChoice).date
            } else if (type === DropdownFilterTypes.COMPLETION_DATE) {
              completionDateFilters = (newFilter as DateFilterChoice).date
            } else if (type === DropdownFilterTypes.DUE_DATE) {
              dueDateFilters = (newFilter as DateFilterChoice).date
            }
          })
          selectedOffices.value = officeFilters
          selectedEnterprises.value = enterpriseFilters
          selectedCourses.value = courseFilters
          selectedUsers.value = userFilters

          selectedEnrollmentDate.value = enrollmentDateFilters
          selectedCompletionDate.value = completionDateFilters
          selectedDueDate.value = dueDateFilters

          const enrollmentDateFiltersObj: DateFilter = {}
          const completionDateFiltersObj: DateFilter = {}
          const dueDateFiltersObj: DateFilter = {}

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

          if (dueDateFilters?.[0]) {
            dueDateFiltersObj.from = dueDateFilters[0]
          }
          if (dueDateFilters?.[1]) {
            dueDateFiltersObj.to = dueDateFilters[1]
          }

          filter.value = {
            enrollmentDate: enrollmentDateFiltersObj,
            completionDate: completionDateFiltersObj,
            dueDate: dueDateFiltersObj,
          }
        } else {
          getCourseDetailedReport()
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

      function handleModalError() {
        showProgress.value = false
      }

      function handleSave() {
        showProgress.value = false
        store.updateSelectedTab(Pages.SCHEDULED_REPORTS)
      }

      return {
        loading,
        handleSort,
        handleDateRangeSelect,
        dropdownStatus,
        dropdownLoader,
        searchKeys,
        selectedCourses,
        selectedUsers,
        selectedEnterprises,
        selectedOffices,
        debouncedGetOffices,
        debouncedGetEnterprises,
        debouncedGetCourses,
        debouncedGetUsers,
        getSpacedDate,
        pagination,
        isMoreDataLoading,
        sortable,
        columns,
        records,
        filterChoices,
        courses,
        enterprises,
        userFilterChoices,
        offices,
        users,
        route,
        updateRoute,
        downloadReport,
        goBack,
        isReportDownloading,
        hasError,
        showModal,
        updateModalStatus,
        EXPORT_URL,
        filter,
        handleSchedulePreSave,
        Placement,
        showProgress,
        progressBarText: PROGRESS_BAR_HEADER.DEFAULT,
        handleSave,
        isFilterSelected,
        resetFilters,
        store,
        loadMore,
        enrollmentDatePicker,
        completionDatePicker,
        dueDatePicker,
        REPORT_ROUTES,
        getLocalizedText,
        selectedEnrollmentDate,
        selectedCompletionDate,
        selectedDueDate,
        handleModalError,
      }
    },
  })
</script>
