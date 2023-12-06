import { Toast, Variant } from '@/types/toast'
import { first } from 'lodash/fp'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { FilterChoice } from '@/utils/reports'
import {
  REPORT_ROUTES,
  USER_SELECTED_PAGE,
  USER_SELECTED_ROUTE,
} from '@/pages/Reports/constants'
import { Filter } from '@/types/filter'
import { getLocalizedText } from '@/utils/util'
import { CancelTokenSource } from 'axios'
import { SEND_EMAIL_AFTER_X_SECONDS } from '@/pages/Reports/ScheduledReports/constants'
import { GlobalPageState } from '@/types'

export interface RLPUser {
  userId: number
  userRoleId: number
  permissions: {
    officeIds: number[]
    enterpriseIds: number[]
    organizationId: number
  }
}

export enum Pages {
  ANALYTICS = 'analytics',
  REPORTS = 'reports',
  SCHEDULED_REPORTS = 'scheduled-reports',
}

export interface LoggedInUserState {
  currentUser?: RLPUser
  blUserId?: string
  pageState: GlobalPageState
  pageStateMsg: string | null
  toast: Toast
  history: Array<Pages>
  route: string
  selectedTab: Pages
  redirectFilters: FilterChoice[]
  isReportDownloading: boolean
  filter: Filter
  alertText: string
  showDownloadAlert: boolean
  scheduleExportUrl: string
  source: CancelTokenSource | null
}

let userSelectedRoute =
  localStorage.getItem(USER_SELECTED_ROUTE) ||
  REPORT_ROUTES.COURSE_COMPLETION_SUMMARY

if (
  userSelectedRoute !== REPORT_ROUTES.COURSE_COMPLETION_SUMMARY &&
  userSelectedRoute !== REPORT_ROUTES.COURSE_COMPLETION_DETAIL &&
  userSelectedRoute !== REPORT_ROUTES.MODULE_COMPLETION_SUMMARY &&
  userSelectedRoute !== REPORT_ROUTES.MODULE_COMPLETION_DETAIL
) {
  userSelectedRoute = REPORT_ROUTES.COURSE_COMPLETION_SUMMARY
}

const userSelectedPage =
  (sessionStorage.getItem(USER_SELECTED_PAGE) as Pages) || Pages.ANALYTICS

export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: (): LoggedInUserState => ({
    pageState: GlobalPageState.LOADING,
    pageStateMsg: null,
    toast: {
      show: false,
      variant: Variant.PRIMARY,
      body: '',
    },
    route: userSelectedRoute,
    history: reactive([userSelectedPage]),
    selectedTab: userSelectedPage,
    redirectFilters: [],
    isReportDownloading: false,
    showDownloadAlert: false,
    scheduleExportUrl: '',
    alertText: '',
    filter: {},
    source: null,
  }),

  actions: {
    updateCurrentUser(user: LoggedInUserState['currentUser']) {
      this.currentUser = user
    },
    resetOnLogout() {
      this.currentUser = undefined
    },
    updateRoute(route: string) {
      this.route = route
    },
    updateSelectedTab(page: Pages) {
      if (this.selectedTab === page) {
        return
      }
      this.selectedTab = page
      this.addNavigationhistory(page)
    },
    revertTab() {
      if (this.history.length <= 0) {
        return
      }
      this.history.shift()
      this.selectedTab = first(this.history) || Pages.ANALYTICS
    },
    setPageState(newState: GlobalPageState) {
      this.pageState = newState
    },
    setPageStateMsg(msg: string) {
      this.pageStateMsg = msg
    },
    updateToast(newToast: Toast) {
      this.toast = newToast
    },
    addNavigationhistory(page: Pages) {
      // keep current page at the top of array
      this.history.unshift(page)
    },
    goBack() {
      this.history.shift()
    },
    goToIndividualCourse(filter: FilterChoice) {
      this.redirectFilters = [filter]
      this.updateRoute(REPORT_ROUTES.COURSE_COMPLETION_DETAIL)
    },
    goToIndividualModule(filter: FilterChoice) {
      this.redirectFilters = [filter]
      this.updateRoute(REPORT_ROUTES.MODULE_COMPLETION_DETAIL)
    },
    resetRedirectfilter() {
      this.redirectFilters = []
    },
    updateReportDownloadingStatus(status: boolean) {
      this.isReportDownloading = status
    },
    updateFilter(filter: Filter) {
      this.filter = filter
    },
    updateAlertText(status: 'noFilterSelected' | 'downloadTakingTime') {
      if (status === 'noFilterSelected') {
        this.alertText = getLocalizedText(
          'alert.scheduleEmail.noFilterSelected'
        )
        return
      }
      this.alertText = getLocalizedText(
        'alert.scheduleEmail.downloadTakingTime'
      )
    },
    updateAlertStatus(status: boolean, exportUrl: string) {
      this.showDownloadAlert = status
      this.scheduleExportUrl = exportUrl
    },
    handleDownloadFailed(
      filter: Filter,
      url: string,
      source: CancelTokenSource
    ) {
      this.source = source
      return setTimeout(() => {
        this.updateFilter(filter)
        this.updateAlertText('downloadTakingTime')
        this.updateAlertStatus(true, url)
      }, SEND_EMAIL_AFTER_X_SECONDS)
    },
    handleNoFilterSelected(filter: Filter, url: string) {
      this.updateFilter(filter)
      this.updateAlertText('noFilterSelected')
      this.updateAlertStatus(true, url)
    },
  },
})
