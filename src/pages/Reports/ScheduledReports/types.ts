import { Filter } from '@/types/filter'
import { DAYS, MONTH_OPTIONS } from './constants'

export interface ReportProp {
  title: string
  url: string
  filter: Filter
}

interface Frequency {
  type: string
  time: {
    hours: number
    minutes: number
  }
  includeWeekends: boolean
}

export interface FormData {
  name: string
  frequency: Frequency
  recipients: Array<string>
  range: string
}
export enum REPEAT_OPTIONS {
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
  // YEAR = 'Year',
}

export enum ENDS_ON {
  AFTER = 'After',
  DATE = 'Date',
  NEVER = 'Never',
}

interface EndsAfter {
  type: ENDS_ON.AFTER
  afterValue: number
  onValue?: Date
}

interface EndsDate {
  type: ENDS_ON.DATE
  onValue: Date
  afterValue?: number
}

interface EndsNever {
  type: ENDS_ON.NEVER
  afterValue?: number
  onValue?: Date
}

type Ends = EndsAfter | EndsDate | EndsNever
export interface RecurrenceData {
  repeatOn: Array<typeof DAYS[number]['cronValue']>
  repeatType: REPEAT_OPTIONS
  repeatMonthlyOn: number
  ends: Ends
}

export interface RecurrenceDataAndString {
  data: RecurrenceData
  selectString: string
}

export enum COMPONENTS {
  FORM,
  RECURRENCE,
}

export enum REPORT_FREQUENCY {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  ANNUALLY = 'ANNUALLY',
  CUSTOM = 'CUSTOM',
  TEMPORARY = 'TEMPORARY',
  EDIT = 'EDIT',
}

export enum RANGE {
  LAST_24_HRS = 'LAST_24_HRS',
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_365_DAYS = 'LAST_365_DAYS',
}

export enum MONTH_IDS {
  DAY_OF_MONTH = 1,
  WEEKLY_DAY = 2,
}

export enum DAY_NAME {
  SUNDAY = 'Sunday',
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
}

export interface SchedulePayload {
  interval: string
  name: string
  range: string
  until: RecurrenceData['ends']
  selectString: string
  includeWeekends: boolean
  recipients: Array<string>
  timeZone: string
  isCustom: boolean
}

export enum Status {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
}

export enum SystemStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface ScheduledReport {
  id: number
  name: string
  eventId: string

  status: Status
  systemStatus: SystemStatus

  eventOwner: string

  endDate: Date

  interval: string

  callbackUrl: string

  context?: Record<string, any>

  tags?: Array<string>

  selectString: string
  lastRun: Date
  totalRuns: number
  lastRunSuccess: boolean
}
