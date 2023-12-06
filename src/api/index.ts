export const COURSES = '/courses'
export const COURSES_BY_USER = '/user/courses'
export const COURSE = '/courses/:id'

export const AUTH = '/authentication'

export const AUTH_LOGIN = `${AUTH}/login`
export const AUTH_LOGOUT = `${AUTH}/logout`
export const PARTNER_AUTH = `${AUTH}/partner`
export const ENABLED_ORG = '/reportings/organization-enabled-status'
export const USERS = '/users'
export const USER = '/users/:id'

export const COURSES_COMPLETION_REPORT = '/reportings/course-details'
export const COURSES_SUMMARY_REPORT = '/reportings/course-summary'
export const MODULE_SUMMARY_REPORT = '/reportings/module-summary'
export const MODULE_DETAILS_REPORT = '/reportings/module-details'

export const REPORTING_DASHBOARD = '/reportings/dashboard-data'

export const REPORTING_ENTERPRISES_WITH_MODULE_ENROLLMENTS =
  '/reportings/enterprises-with-module-enrollments'
export const REPORTING_ENTERPRISES_WITH_COURSE_ENROLLMENTS =
  '/reportings/enterprises-with-course-enrollments'
export const REPORTING_OFFICES_WITH_COURSE_ENROLLMENTS =
  '/reportings/offices-with-course-enrollments'
export const REPORTING_OFFICES_WITH_MODULE_ENROLLMENTS =
  '/reportings/offices-with-module-enrollments'
export const REPORTING_COURSES = '/reportings/courses'
export const REPORTING_MODULES = '/reportings/modules'
export const REPORTING_USERS_WITH_MODULE_ENROLLMENTS =
  '/reportings/users-with-module-enrollments'
export const REPORTING_USERS_WITH_COURSE_ENROLLMENTS =
  '/reportings/users-with-course-enrollments'

export const EXPORT_MODULE_SUMMARY = '/export/report/module-summary'
export const EXPORT_MODULE_DETAILS = '/export/report/module-details'
export const EXPORT_COURSE_SUMMARY = '/export/report/course-summary'
export const EXPORT_COURSE_DETAILS = '/export/report/course-details'

export const SCHEDULED_EXPORT_LAST_RUN = '/schedule-export/download-last-run'

export const BLOCKS_BASE_URL = 'https://skcolb.com'

export const BLOCKS_PARTNER_ID = 'BL'
export const BLOCKS_CREATE_MODULE = `${BLOCKS_BASE_URL}/create-module?iframe=true&partner=${BLOCKS_PARTNER_ID}`
export const BLOCKS_UPDATE_MODULE = `${BLOCKS_BASE_URL}/edit/:id?iframe=true&partner=${BLOCKS_PARTNER_ID}`
export const BLOCKS_MODULE_BASE = `${BLOCKS_BASE_URL}/api/courses`
export const BLOCKS_MODULE_LIST = `${BLOCKS_MODULE_BASE}/list`
export const BLOCKS_MODULE_SEARCH = `${BLOCKS_MODULE_BASE}/search`
export const BLOCKS_MODULES_BY_USER = `${BLOCKS_MODULE_BASE}/mine/:id`

export const SCHEDULED_REPORTS = `report-scheduler`
export const SCHEDULED_REPORT = `report-scheduler/:id`
export const PAUSE_SCHEDULED_REPORT = `report-scheduler/:id/pause`
export const RESUME_SCHEDULED_REPORT = `report-scheduler/:id/resume`
