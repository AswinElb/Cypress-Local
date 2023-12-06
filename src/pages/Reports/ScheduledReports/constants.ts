import {
  day,
  dayOfTheMonth,
  numberToPlacement,
  shortenedDay,
} from '@/utils/date'
import {
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
} from 'date-fns'
import {
  ENDS_ON,
  REPEAT_OPTIONS,
  MONTH_IDS,
  RANGE,
  REPORT_FREQUENCY,
  DAY_NAME,
} from './types'

export const DAYS = [
  { id: 1, label: 'S', value: 'SUN', fullName: DAY_NAME.SUNDAY, cronValue: 0 },
  { id: 2, label: 'M', value: 'MON', fullName: DAY_NAME.MONDAY, cronValue: 1 },
  { id: 3, label: 'T', value: 'TUE', fullName: DAY_NAME.TUESDAY, cronValue: 2 },
  {
    id: 4,
    label: 'W',
    value: 'WED',
    fullName: DAY_NAME.WEDNESDAY,
    cronValue: 3,
  },
  {
    id: 5,
    label: 'TH',
    value: 'THU',
    fullName: DAY_NAME.THURSDAY,
    cronValue: 4,
  },
  { id: 6, label: 'F', value: 'FRI', fullName: DAY_NAME.FRIDAY, cronValue: 5 },
  {
    id: 7,
    label: 'S',
    value: 'SAT',
    fullName: DAY_NAME.SATURDAY,
    cronValue: 6,
  },
]

export const MONTH_OPTIONS = [
  {
    id: MONTH_IDS.DAY_OF_MONTH,
    label: `Monthly on day ${shortenedDay}`,
    day: shortenedDay,
    dayPosition: 0,
  },
  {
    id: MONTH_IDS.WEEKLY_DAY,
    label: `Monthly on the ${numberToPlacement(dayOfTheMonth)} ${day}`,
    dayPosition: dayOfTheMonth,
    day,
  },
]
export const INITIAL_STATE = {
  repeatOn: [],
  repeatType: REPEAT_OPTIONS.DAY,
  repeatMonthlyOn: new Date().getDate(),
  ends: {
    type: ENDS_ON.NEVER,
    onValue: new Date(),
    afterValue: 1,
  },
}

export function getReportState() {
  return {
    name: '',
    frequency: {
      type: REPORT_FREQUENCY.DAILY,
      time: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      },
      includeWeekends: false,
    },
    recipients: [],
    range: RANGE.LAST_24_HRS,
  }
}

export const dayToNextFunctionMapper = {
  [DAY_NAME.SUNDAY]: nextSunday,
  [DAY_NAME.MONDAY]: nextMonday,
  [DAY_NAME.TUESDAY]: nextTuesday,
  [DAY_NAME.WEDNESDAY]: nextWednesday,
  [DAY_NAME.THURSDAY]: nextThursday,
  [DAY_NAME.FRIDAY]: nextFriday,
  [DAY_NAME.SATURDAY]: nextSaturday,
}

export const EXPORT_REPORTS_PREFIX = 'Reports_'
const nodeEnv = import.meta.env.VITE_FRONTEND_NODE_ENV
export const SEND_EMAIL_AFTER_X_SECONDS =
  nodeEnv === 'production' ? 3 * 60 * 1000 : 2 * 60 * 100
