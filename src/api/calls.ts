import { ExportFileType } from '@/pages/Reports/types'
import { ScheduleReportResponse } from '@/types'
import { http, httpBlob, scheduleReportHttp } from '@/utils/http'
import axios, { AxiosResponse, CancelTokenSource } from 'axios'

import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  USER,
  COURSES_COMPLETION_REPORT,
  PARTNER_AUTH,
  COURSES_SUMMARY_REPORT,
  REPORTING_OFFICES_WITH_MODULE_ENROLLMENTS,
  REPORTING_OFFICES_WITH_COURSE_ENROLLMENTS,
  REPORTING_MODULES,
  REPORTING_COURSES,
  MODULE_SUMMARY_REPORT,
  REPORTING_DASHBOARD,
  MODULE_DETAILS_REPORT,
  REPORTING_USERS_WITH_COURSE_ENROLLMENTS,
  REPORTING_USERS_WITH_MODULE_ENROLLMENTS,
  REPORTING_ENTERPRISES_WITH_MODULE_ENROLLMENTS,
  REPORTING_ENTERPRISES_WITH_COURSE_ENROLLMENTS,
  EXPORT_COURSE_SUMMARY,
  EXPORT_MODULE_SUMMARY,
  EXPORT_COURSE_DETAILS,
  EXPORT_MODULE_DETAILS,
  SCHEDULED_REPORTS,
  SCHEDULED_REPORT,
  PAUSE_SCHEDULED_REPORT,
  RESUME_SCHEDULED_REPORT,
  SCHEDULED_EXPORT_LAST_RUN,
  ENABLED_ORG,
} from './'

export const login = (username: string, password: string) => {
  return http.post(AUTH_LOGIN, { username, password })
}

export const logout = (refreshToken: string) => {
  return http.post(AUTH_LOGOUT, {
    refresh: refreshToken,
  })
}

export const fetchUser = (id: string) => {
  return http.get(USER.replace(':id', id))
}

export const fetchCourseCompletionReport = (
  payload?: Record<string, unknown>
) => {
  return http.post(COURSES_COMPLETION_REPORT, payload)
}

export const exportCourseDetailsReport = (
  payload?: Record<string, unknown>,
  fileType: ExportFileType = 'xlsx'
) => {
  const source = axios.CancelToken.source()

  return {
    response: httpBlob.post(
      `${EXPORT_COURSE_DETAILS}?fileType=${fileType}`,
      payload,
      { cancelToken: source.token }
    ),
    source,
  }
}

export const fetchCourseSummaryReport = (payload?: Record<string, unknown>) => {
  return http.post(COURSES_SUMMARY_REPORT, payload)
}

export const exportCourseSummaryReport = (
  payload?: Record<string, unknown>,
  fileType: ExportFileType = 'xlsx'
) => {
  return httpBlob.post(`${EXPORT_COURSE_SUMMARY}?fileType=${fileType}`, payload)
}

export const fetchModuleSummaryReport = (payload?: Record<string, unknown>) => {
  return http.post(MODULE_SUMMARY_REPORT, payload)
}

export const exportModuleSummaryReport = (
  payload?: Record<string, unknown>,
  fileType: ExportFileType = 'xlsx'
) => {
  return httpBlob.post(`${EXPORT_MODULE_SUMMARY}?fileType=${fileType}`, payload)
}

export const fetchDashboardData = (payload?: Record<string, unknown>) => {
  return http.post(REPORTING_DASHBOARD, payload)
}

export const fetchModuleDetailsReport = (payload?: Record<string, unknown>) => {
  return http.post(MODULE_DETAILS_REPORT, payload)
}

export const exportModuleDetailsReport = (
  payload?: Record<string, unknown>,
  fileType: ExportFileType = 'xlsx'
) => {
  const source = axios.CancelToken.source()

  return {
    response: httpBlob.post(
      `${EXPORT_MODULE_DETAILS}?fileType=${fileType}`,
      payload,
      { cancelToken: source.token }
    ),
    source,
  }
}

export const validatePartner = (payload: Record<string, unknown>) => {
  return http.post(PARTNER_AUTH, payload)
}

export const validateEnabledOrg = (params?: Record<string, unknown>) => {
  return http.get(ENABLED_ORG, {
    params,
  })
}

export const fetchEnterprisesWithModuleEnrollments = (
  params?: Record<string, unknown>
) => {
  return http.get(REPORTING_ENTERPRISES_WITH_MODULE_ENROLLMENTS, {
    params,
  })
}
export const fetchEnterprisesWithCourseEnrollments = (
  params?: Record<string, unknown>
) => {
  return http.get(REPORTING_ENTERPRISES_WITH_COURSE_ENROLLMENTS, {
    params,
  })
}
export const fetchOfficesWithModuleEnrollments = (
  params?: Record<string, unknown>
) => {
  return http.get(REPORTING_OFFICES_WITH_MODULE_ENROLLMENTS, {
    params,
  })
}
export const fetchOfficesWithCourseEnrollments = (
  params?: Record<string, unknown>
) => {
  return http.get(REPORTING_OFFICES_WITH_COURSE_ENROLLMENTS, {
    params,
  })
}

export const fetchCoursesList = (params?: Record<string, unknown>) => {
  return http.get(REPORTING_COURSES, {
    params,
  })
}

export const fetchUsersWithModuleEnrollments = (
  params?: Record<string, unknown>
) => {
  return http.get(REPORTING_USERS_WITH_MODULE_ENROLLMENTS, {
    params,
  })
}

export const fetchUsersWithCourseEnrollments = (
  params?: Record<string, unknown>
) => {
  return http.get(REPORTING_USERS_WITH_COURSE_ENROLLMENTS, {
    params,
  })
}

export const fetchModules = (params?: Record<string, unknown>) => {
  return http.get(REPORTING_MODULES, {
    params,
  })
}

// Schedule Reports

export const fetchScheduledReports = (params?: Record<string, unknown>) => {
  return scheduleReportHttp.get(SCHEDULED_REPORTS, {
    params,
  }) as Promise<
    AxiosResponse<{
      data: Array<ScheduleReportResponse>
      meta: { total: number }
    }>
  >
}

export const fetchScheduledReport = (
  id: number,
  params?: Record<string, unknown>
) => {
  return scheduleReportHttp.get(
    SCHEDULED_REPORT.replace(':id', id.toString()),
    {
      params,
    }
  ) as Promise<AxiosResponse<{ data: ScheduleReportResponse }>>
}

export const scheduleReport = (payload?: Record<string, unknown>) => {
  return scheduleReportHttp.post(SCHEDULED_REPORTS, payload)
}

export const updateScheduleReport = (
  id: number,
  payload?: Record<string, unknown>
) => {
  return scheduleReportHttp.patch(
    SCHEDULED_REPORT.replace(`:id`, id.toString()),
    payload
  )
}

export const pauseScheduleReport = (id: number) => {
  return scheduleReportHttp.post(
    PAUSE_SCHEDULED_REPORT.replace(`:id`, id.toString())
  )
}

export const resumeScheduleReport = (id: number) => {
  return scheduleReportHttp.post(
    RESUME_SCHEDULED_REPORT.replace(`:id`, id.toString())
  )
}

export const deleteScheduleReport = (id: number) => {
  return scheduleReportHttp.delete(
    SCHEDULED_REPORT.replace(`:id`, id.toString())
  )
}

export const downloadLastRun = (payload: Record<string, unknown>) => {
  return httpBlob.post(SCHEDULED_EXPORT_LAST_RUN, payload)
}

export const scheduleLargeReport = async (
  url: string,
  payload: Record<string, unknown>
) => {
  return http.post(url, payload)
}

export const cancelRequest = (source: CancelTokenSource) => {
  if (source) {
    source.cancel()
  }
}
