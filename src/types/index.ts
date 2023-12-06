import {
  RANGE,
  RecurrenceData,
  Status,
  SystemStatus,
} from '@/pages/Reports/ScheduledReports/types'

export interface SlackUser {
  name: string
  id: string
  email: string
  real_name: string
}

export interface ResponseMeta {
  total: number
}

export interface Iframe {
  status: boolean
  userId: null | string
}

export interface User {
  userId: string
  keycloakId: string
  email: string
  firstName: string
  lastName: string
  address?: string
  address2?: string
  city?: string
  state?: string
  country?: string
  postalCode: string
  timezone?: string
  phone?: string
  active?: boolean
  totalLogins?: number
  lastLogin?: string
  createdAt?: string
  avatar?: string
  relatedPlatformId?: string
}

export interface ScheduleReportResponse {
  id: number
  name: string
  eventId: string
  systemStatus: SystemStatus
  status: Status
  endDate: Date | null
  callbackUrl: string
  endOccurrenceLimit: null | number
  context: {
    range: RANGE
    recipients: Array<string>
    filter: Record<string, unknown>
  }
  tags: null | Array<string>
  totalRuns: number
  interval: string
  lastRun: null | Date
  lastRunSuccess: null | boolean
  timeZone: string | null
  includeWeekends: boolean | null

  meta?: Omit<RecurrenceData, 'ends'> & { selectString: string }
}

export enum GlobalPageState {
  LOADING = 'Loading',
  NO_COOKIES = 'No-Cookies',
  ERROR = 'Error',
  VALID = 'Valid',
}
