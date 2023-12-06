<template>
  <div class="row no-w" data-test="module-completion-detailed">
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
                label="name"
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
                :custom-label="moduleCustomLabel"
                :placeholder="
                  getLocalizedText('message.filters.searchPlaceholder')
                "
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
                class="custom-class"
                @range:select="(date: Date[]) =>handleDateRangeSelect('completionDate', date)"
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
          <template #id="scope">
            {{ scope.user.id }}
          </template>
          <template #firstName="scope">
            <Tooltip :message="scope.user.first_name" :wrap-text="true">
              {{ scope.user.first_name }}
            </Tooltip>
          </template>
          <template #lastName="scope">
            <Tooltip :message="scope.user.last_name" :wrap-text="true">
              {{ scope.user.last_name }}
            </Tooltip>
          </template>
          <template #email="scope">
            <Tooltip :message="scope.user.email" :wrap-text="true">{{
              scope.user.email
            }}</Tooltip>
          </template>
          <template #userStatus="scope">
            {{ scope.user.active ? 'Active' : 'Inactive' }}
          </template>
          <template #enterprise="scope">
            <Tooltip
              :message="getJoinedNames(scope.user.enterprises)"
              :wrap-text="true"
            >
              {{ getJoinedNames(scope.user.enterprises) }}
            </Tooltip>
          </template>
          <template #office="scope">
            <Tooltip
              :message="getJoinedNames(scope.user.offices)"
              :wrap-text="true"
            >
              {{ getJoinedNames(scope.user.offices) }}
            </Tooltip>
          </template>
          <template #learnerGroup="scope">
            <Tooltip
              :message="getJoinedNames(scope.user.learner_groups)"
              :wrap-text="true"
            >
              {{ getJoinedNames(scope.user.learner_groups) }}
            </Tooltip>
          </template>
          <template #moduleId="scope">
            {{ scope.module.id }}
          </template>
          <template #moduleName="scope">
            <Tooltip
              :message="scope.module.title ?? scope.module.name"
              :wrap-text="true"
            >
              {{ scope.module.title ?? scope.module.name }}
            </Tooltip>
          </template>
          <template #moduleType="scope">
            {{ scope.module.module_type }}
          </template>
          <template #completionStatus="scope">
            {{ scope.status }}
          </template>
          <template #lastAccessedAt="scope">
            {{
              scope.last_accessed_at ? formatDate(scope.last_accessed_at) : ''
            }}
          </template>
          <template #completionDate="scope">
            {{ scope.completed_on ? formatDate(scope.completed_on) : '' }}
          </template>
          <template #score="scope">
            {{
              typeof scope.score === 'number'
                ? scope.score?.toFixed(0)
                : scope.score
            }}
          </template>
          <template #attempts="scope">
            {{ scope.number_of_attempts }}
          </template>
        </table-with-sort>
      </div>
    </div>
  </div>

  <schedule-modal
    :report="{
      title: getLocalizedText('message.navbar.moduleCompletionDetailed'),
      url: EXPORT_URL,
      filter: filter,
    }"
    :show="showModal"
    @close="() => updateModalStatus(false)"
    @save="handleSave"
    @error="handleModalError"
    @pre-save="handleSchedulePreSave"
  >
  </schedule-modal>
  <progress-bar :show="showProgress">
    <template #header
      ><h5 class="modal-title">{{ PROGRESS_BAR_HEADER.DEFAULT }}</h5></template
    >
  </progress-bar>
</template>

<script lang="ts" setup>
  import { computed, onBeforeMount, ref, useAttrs, useSlots, watch } from 'vue'
  import VueMultiselect from 'vue-multiselect'
  import TableWithSort from '@/components/common/TableWithSort.vue'
  import Tooltip from '@/components/common/Tooltip.vue'
  import CalendarComponent from '@/components/common/CalendarComponent.vue'
  import ReportHeader from '@/components/common/ReportHeader.vue'
  import {
    fetchEnterprisesWithModuleEnrollments,
    fetchModules,
    fetchOfficesWithModuleEnrollments,
    fetchUsersWithModuleEnrollments,
    fetchModuleDetailsReport,
    exportModuleDetailsReport,
  } from '@/api/calls'
  import { displayToast } from '@/utils/show-toast'
  import { getOpenSearchCompatibleSort } from '@/utils/os-compatible-sort'
  import { Variant } from '@/types/toast'
  import { Sort, TableColumns } from '@/types/table'
  import { formatDate } from '@/utils/date'
  import { Filter } from '@/types/filter'
  import {
    ModuleCompletionDetailedReportAfterKey,
    ModuleDetails,
  } from './types'
  import { MODULE_DETAILS_FILTER_CHOICES } from '@/constants/auth'
  import {
    OSEnterprise,
    OSLearnerGroup,
    OSModule,
    OSOffice,
    OSUser,
  } from '../CourseCompletion/types'
  import { debounce } from 'lodash/fp'
  import { DateFilter, ExportFileType, FilterObject } from '../types'
  import { DropdownStatus } from '@/types/report'
  import {
    DropdownFilterTypes,
    getCurrentUserFilters,
    restrictDropdownsByUserRole,
    setCurrentUserFilters,
    FilterChoice,
    getDynamicPaginationLimit,
    downloadBlobFile,
    DateFilterChoice,
  } from '@/utils/reports'
  import { Pages, useLoggedInUserStore } from '@/store'
  import ProgressBar from '@/components/common/ProgressBar.vue'
  import ScheduleModal from '@/pages/Reports/ScheduledReports/Modal.vue'
  import { BASE_URL } from '@/utils/http'
  import { PROGRESS_BAR_HEADER } from '../constants'
  import { EXPORT_REPORTS_PREFIX } from '../ScheduledReports/constants'
  import { getLocalizedText } from '@/utils/util'
  import { storeToRefs } from 'pinia'
  import { saveUserSelectedRoute } from '@/utils/user'

  interface DropdownLoader {
    isOfficeLoading: boolean
    isEnterpriseLoading: boolean
    isModuleLoading: boolean
    isUserLoading: boolean
  }
  interface SearchKey {
    module: string
    enterprise: string
    office: string
    user: string
  }

  const DEBOUNCE_TIME = 1000
  const EXPORT_URL = `${BASE_URL}/schedule-export/report/module-details?fileType=xlsx`

  const props = defineProps({
    id: {
      type: String,
      required: false,
      default: '',
    },
  })
  const ctx = {
    slots: useSlots(),
    attrs: useAttrs(),
  }

  const store = useLoggedInUserStore()

  const route = computed(() => store.route)

  const updateRoute = (event: Event) => {
    store.updateRoute((event.currentTarget as HTMLInputElement).value)
    saveUserSelectedRoute((event.currentTarget as HTMLInputElement).value)
  }

  const currentUser = computed(() => store.currentUser)

  const completionDatePicker = ref()

  const loading = ref(true)
  const hasError = ref(false)
  const { isReportDownloading } = storeToRefs(store)
  const showProgress = ref(false)
  const redirectMode = ref(false)

  const isMoreDataLoading = ref(false)
  const afterKey = ref<ModuleCompletionDetailedReportAfterKey>()

  const selectedModules = ref<Array<OSModule>>([])
  const selectedEnterprises = ref<Array<OSEnterprise>>([])
  const selectedOffices = ref<Array<OSOffice>>([])
  const selectedUsers = ref<Array<FilterChoice>>([])

  const selectedCompletionDate = ref<Date[]>([])

  const moduleCustomLabel = (module: OSModule) => module.title ?? module.name

  const columns: TableColumns[] = [
    {
      id: 'id',
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
      id: 'email',
      label: 'Email ID',
    },
    {
      id: 'userStatus',
      label: 'User Status',
    },
    {
      id: 'enterprise',
      label: 'Current Enterprise',
    },
    {
      id: 'office',
      label: 'Current Office',
    },
    {
      id: 'learnerGroup',
      label: 'Current Learner Group',
    },
    {
      id: 'moduleId',
      label: 'Module ID',
    },
    {
      id: 'moduleName',
      label: 'Module Name',
    },
    {
      id: 'moduleType',
      label: 'Module Type',
    },
    {
      id: 'completionStatus',
      label: 'Completion Status',
    },
    {
      id: 'lastAccessedAt',
      label: 'Last Accessed',
    },
    {
      id: 'completionDate',
      label: 'Completion Date',
    },
    {
      id: 'score',
      label: 'Score',
      isNumerical: true,
    },
    {
      id: 'attempts',
      label: 'Number of Attempts',
      isNumerical: true,
    },
  ]
  const records = ref<Array<ModuleDetails> | Array<Record<never, never>>>([])
  const currentRecordsCount = ref(0)

  const enterprises = ref<Array<OSEnterprise>>([])
  const offices = ref<Array<OSOffice>>([])
  const modules = ref<Array<OSModule>>([])
  const users = ref<Array<OSUser>>([])

  const filter = ref<Filter>({})

  const dropdownLoader = ref<DropdownLoader>({
    isOfficeLoading: false,
    isEnterpriseLoading: false,
    isModuleLoading: false,
    isUserLoading: false,
  })

  const dropdownStatus = ref<DropdownStatus>({
    isEnterpriseDisabled: true,
    isOfficeDisabled: true,
  })

  const searchKeys = ref<SearchKey>({
    module: '',
    office: '',
    enterprise: '',
    user: '',
  })

  const filterChoices = computed((): Array<FilterChoice | DateFilterChoice> => {
    const moduleData: Array<FilterChoice> = selectedModules.value.map(
      (module) => ({
        id: module.id,
        name: module.title ?? module.name,
        type: DropdownFilterTypes.MODULE,
      })
    )
    const officesData: Array<FilterChoice> = selectedOffices.value.map(
      (office) => ({
        id: office.id,
        name: office.name,
        type: DropdownFilterTypes.OFFICE,
      })
    )
    const enterpriseData: Array<FilterChoice> = selectedEnterprises.value.map(
      (enterprise) => ({
        id: enterprise.id,
        name: enterprise.name,
        type: DropdownFilterTypes.ENTERPRISE,
      })
    )

    const userData: Array<FilterChoice> = selectedUsers.value.map((user) => ({
      id: user.id,
      name: user.name,
      type: DropdownFilterTypes.USER,
    }))
    const completionDateData = {
      date: selectedCompletionDate.value,
      type: DropdownFilterTypes.COMPLETION_DATE,
    }
    return [
      ...moduleData,
      ...officesData,
      ...enterpriseData,
      ...userData,
      completionDateData,
    ]
  })

  const isMoreDataAvailable = computed(() => {
    return getDynamicPaginationLimit() === currentRecordsCount.value
  })

  const loadMore = async () => {
    if (isMoreDataLoading.value || !isMoreDataAvailable.value) {
      return
    }
    isMoreDataLoading.value = true
    const res = await fetchModuleDetailsReport({
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
      MODULE_DETAILS_FILTER_CHOICES,
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

  const getUsers = async (search?: string) => {
    const trimmedSearchTerm = search?.trim()
    searchKeys.value.user = trimmedSearchTerm || ''
    if (!trimmedSearchTerm || trimmedSearchTerm.length < 3) {
      users.value = []
      return
    }

    dropdownLoader.value.isUserLoading = true
    try {
      const res = await fetchUsersWithModuleEnrollments({
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

  const userFilterChoices = computed(() => {
    return users.value.map((u) => ({
      id: u.id,
      name: `${u.first_name} ${u.last_name}`,
    }))
  })

  const debouncedGetOffices = debounce(DEBOUNCE_TIME, getOffices)
  const debouncedGetEnterprises = debounce(DEBOUNCE_TIME, getEnterprises)
  const debouncedGetModules = debounce(DEBOUNCE_TIME, getModules)
  const debouncedGetUsers = debounce(DEBOUNCE_TIME, getUsers)

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

  const handleDateRangeSelect = (key: string, dates: Date[]) => {
    const dateFilter: DateFilter = {}
    if (dates?.[0]) {
      dateFilter.from = dates[0]
    }
    if (dates?.[1]) {
      dateFilter.to = dates[1]
    }

    if (key === 'completionDate') {
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

  const getModuleDetailsReport = async () => {
    loading.value = true
    hasError.value = false
    try {
      const res = await fetchModuleDetailsReport({
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
        getLocalizedText('alert.moduleDetail.fetchFail'),
        Variant.DANGER,
        'Error'
      )
      console.error(e)
    }
  }

  const downloadReport = async (fileType: ExportFileType) => {
    const scheduleModuleDetailedReportUrl = `${BASE_URL}/schedule-export/report/schedule-module-completion-email?fileType=${fileType}`

    store.updateReportDownloadingStatus(true)
    if (isFilterSelected.value) {
      try {
        const { response, source } = exportModuleDetailsReport(
          {
            sort: openSearchCompatibleSort.value,
            filter: filter.value,
          },
          fileType
        )

        const downloadTimeout = store.handleDownloadFailed(
          filter.value,
          scheduleModuleDetailedReportUrl,
          source
        )
        const res = await response

        if (!res) {
          throw new Error('cancelled')
        }

        clearTimeout(downloadTimeout)

        downloadBlobFile(
          `${EXPORT_REPORTS_PREFIX}Module_Enrollment_Details.${fileType}`,
          res.data.data
        )
      } catch (e: any) {
        if (!((e.name as string) !== 'cancelled')) {
          displayToast(
            getLocalizedText('alert.moduleDetail.reportFail'),
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
        scheduleModuleDetailedReportUrl
      )
    }
  }

  const goBack = () => {
    window.parent.postMessage('bl-reports-close', '*')
  }

  const debouncedDetailsReport = debounce(DEBOUNCE_TIME, getModuleDetailsReport)

  const handlePageChange = (newPage: number) => {
    getModuleDetailsReport()
  }

  watch(sortable, getModuleDetailsReport)

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

  watch(selectedUsers, (users) => {
    const selectedUserIds = users.map((user) => {
      return { id: user.id, name: user.name }
    })
    changeSearch('users', selectedUserIds)
  })

  const resetFilters = () => {
    selectedUsers.value = []
    selectedModules.value = []
    selectedOffices.value = []
    selectedEnterprises.value = []
    selectedCompletionDate.value = []
    completionDatePicker.value.resetDate()
  }

  const isFilterSelected = computed(() => {
    return (
      selectedUsers.value.length ||
      selectedModules.value.length ||
      selectedOffices.value.length ||
      selectedEnterprises.value.length ||
      filter.value['completionDate']?.from
    )
  })

  watch(filter, () => {
    debouncedDetailsReport()
  })

  watch(filterChoices, (value) => {
    if (redirectMode.value) {
      return
    }
    updateFilterCookie(value)
  })

  onBeforeMount(() => {
    if (store.redirectFilters.length) {
      const redirectFilters = store.redirectFilters
      selectedModules.value = redirectFilters.map(
        (filter) =>
          ({
            id: filter.id,
            name: filter.name,
          } as OSModule)
      )
      redirectMode.value = true
      restrictDropdownsByUserRole(dropdownStatus)
      store.resetRedirectfilter()
      return
    }
    const currentFilters = getCurrentUserFilters(
      MODULE_DETAILS_FILTER_CHOICES,
      filterChoices,
      currentUser
    )
    if (currentFilters && Array.isArray(currentFilters)) {
      const moduleFilters: typeof selectedModules.value = []
      const officeFilters: typeof selectedOffices.value = []
      const enterpriseFilters: typeof selectedEnterprises.value = []
      const userFilters: any = []
      let completionDateFilters: Date[] = []
      currentFilters.forEach((filter) => {
        const { type, ...newFilter } = filter
        if (type === DropdownFilterTypes.MODULE) {
          moduleFilters.push(newFilter as OSModule)
        } else if (type === DropdownFilterTypes.OFFICE) {
          officeFilters.push(newFilter as OSOffice)
        } else if (type === DropdownFilterTypes.ENTERPRISE) {
          enterpriseFilters.push(newFilter as OSEnterprise)
        } else if (type === DropdownFilterTypes.USER) {
          userFilters.push(newFilter)
        } else if (type === DropdownFilterTypes.COMPLETION_DATE) {
          completionDateFilters = (newFilter as DateFilterChoice).date
        }
      })

      selectedOffices.value = officeFilters
      selectedEnterprises.value = enterpriseFilters
      selectedModules.value = moduleFilters
      selectedUsers.value = userFilters

      selectedCompletionDate.value = completionDateFilters

      const completionDateFiltersObj: DateFilter = {}

      if (completionDateFilters?.[0]) {
        completionDateFiltersObj.from = completionDateFilters[0]
      }
      if (completionDateFilters?.[1]) {
        completionDateFiltersObj.to = completionDateFilters[1]
      }

      filter.value = {
        completionDate: completionDateFiltersObj,
      }
    } else {
      getModuleDetailsReport()
    }

    restrictDropdownsByUserRole(dropdownStatus)
  })

  const getJoinedNames = (
    items: Array<OSEnterprise | OSOffice | OSLearnerGroup>
  ) => {
    return items?.map((item) => item.name).join(', ') || ''
  }

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
</script>
