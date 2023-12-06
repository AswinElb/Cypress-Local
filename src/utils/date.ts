import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYesterday,
  subDays,
  differenceInDays,
  getWeekOfMonth,
} from 'date-fns'

import {
  DATE_FORMAT,
  LAST_RUN_FORMAT,
  SPACED_DATE_FORMAT,
} from '@/constants/date'

// @TODO: Will need to move all the date-fns usage to luxon

export const getStandardDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat)

export const getSpacedDate = (date: Date) =>
  getStandardDate(new Date(date), SPACED_DATE_FORMAT)

export const formatDate = (date: string) =>
  getStandardDate(new Date(date), DATE_FORMAT)

export const getFirstDayOfMonth = () => {
  const date = new Date()
  const firstDay = startOfMonth(date)

  return firstDay
}

export const getLastDayOfMonth = () => {
  const date = new Date()
  const lastDay = endOfMonth(date)

  return lastDay
}

export const getFirstDayOfWeek = () => {
  const date = new Date()
  const firstDay = startOfWeek(date)

  return firstDay
}

export const getLastDayOfWeek = () => {
  const date = new Date()
  const lastDay = endOfWeek(date)

  return lastDay
}

export const getFirstDayOfLastMonth = () => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)

  const firstDay = startOfMonth(date)

  return firstDay
}

export const getLastDayOfLastMonth = () => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)

  const lastDay = endOfMonth(date)

  return lastDay
}

export const getFirstDayOfLastWeek = () => {
  const date = new Date()
  const firstDay = subtractDays(startOfWeek(date), 8)

  return firstDay
}

export const getLastDayOfLastWeek = () => {
  const date = new Date()
  const lastDay = subtractDays(endOfWeek(date), 8)

  return lastDay
}

export const getYesterday = () => {
  return startOfYesterday()
}

export const getToday = () => {
  return startOfToday()
}

export const subtractDays = (initialDate: Date, days: number): Date => {
  return subDays(initialDate, days)
}

export const getDifferenceInDays = (
  laterDate: Date,
  earlierDate: Date
): number => {
  return differenceInDays(laterDate, earlierDate)
}

export const today = new Date()
export const dayOfTheMonth = getWeekOfMonth(today)
export const dayAndMonth = format(today, 'MMMM dd')
export const shortenedDay = format(today, 'd')
export const day = format(today, 'EEEE')

export function formatCalendarDate(date: Date) {
  return format(date, 'MMM dd, yyyy')
}

export function formatLastRun(date: Date) {
  return format(date, LAST_RUN_FORMAT)
}

const NUMBER_PLACEMENT = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  5: 'fifth',
  6: 'sixth',
  7: 'seventh',
}
export function numberToPlacement(day: number) {
  return NUMBER_PLACEMENT[day as keyof typeof NUMBER_PLACEMENT]
}

const pr = new Intl.PluralRules('en-US', { type: 'ordinal' })

const suffixes = new Map([
  ['one', 'st'],
  ['two', 'nd'],
  ['few', 'rd'],
  ['other', 'th'],
])
export const formatOrdinals = (n: number) => {
  const rule = pr.select(n)
  const suffix = suffixes.get(rule)
  return `${n}${suffix}`
}
