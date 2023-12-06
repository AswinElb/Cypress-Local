import { ComputedRef } from 'vue'
import { RLP_USER_INFO, RLP_USER_ROLE } from '@/constants/auth'
import { Ref } from 'vue'
import { DropdownStatus } from '@/types/report'
import {
  OSCourse,
  OSEnterprise,
  OSOffice,
} from '@/pages/Reports/CourseCompletion/types'
import { LoggedInUserState } from '@/store'

export enum DropdownFilterTypes {
  COURSE = 'Course',
  MODULE = 'Module',
  OFFICE = 'Office',
  ENTERPRISE = 'Enterprise',
  USER = 'User',
  COMPLETION_DATE = 'Completion Date',
  ENROLLMENT_DATE = 'Enrollment Date',
  DUE_DATE = 'Due Date',
}

export type FilterChoice = {
  id: number
  name: string
  type: DropdownFilterTypes
}

export type DateFilterChoice = {
  date: Date[]
  type: DropdownFilterTypes
}

export const restrictDropdownsByUserRole = (
  dropdownStatus: Ref<DropdownStatus>
) => {
  const rlpUserInfo = localStorage.getItem(RLP_USER_INFO)

  if (!rlpUserInfo) {
    return
  }

  const parsedRlpUserInfo = JSON.parse(rlpUserInfo)

  if (parsedRlpUserInfo.user_role_id === RLP_USER_ROLE.orgAdmin) {
    dropdownStatus.value.isEnterpriseDisabled = false
    dropdownStatus.value.isOfficeDisabled = false
  } else if (parsedRlpUserInfo.user_role_id === RLP_USER_ROLE.enterpriseAdmin) {
    dropdownStatus.value.isEnterpriseDisabled = true
    dropdownStatus.value.isOfficeDisabled = false
  } else if (parsedRlpUserInfo.user_role_id === RLP_USER_ROLE.officeAdmin) {
    dropdownStatus.value.isEnterpriseDisabled = true
    dropdownStatus.value.isOfficeDisabled = true
  }
}

export type Filters = (OSEnterprise | OSOffice | OSCourse) & {
  type: DropdownFilterTypes
}

export type PossibleFilterChoice = Filters | FilterChoice | DateFilterChoice

export const getCurrentUserFilters = (
  localStorageKey: string,
  filterChoices: ComputedRef<PossibleFilterChoice[]>,
  currentUser: ComputedRef<LoggedInUserState['currentUser']>
) => {
  if (!currentUser) {
    return
  }
  const unparsedFilters = localStorage.getItem(localStorageKey)
  if (!unparsedFilters) {
    return
  }
  const parsedLocalStorageValue: {
    userId: string
    filter: typeof filterChoices.value
  }[] = JSON.parse(unparsedFilters)

  const currentUserFilter = parsedLocalStorageValue.find(
    (filter: any) => filter.userId === currentUser.value?.userId
  )
  if (!currentUserFilter) {
    return null
  }

  return currentUserFilter.filter
}

export const setCurrentUserFilters = (
  localStorageKey: string,
  filterChoices: (FilterChoice | DateFilterChoice)[],
  currentUser: ComputedRef<LoggedInUserState['currentUser']>
) => {
  if (!currentUser.value) {
    return
  }

  const unparsedFilters = localStorage.getItem(localStorageKey)
  if (unparsedFilters) {
    const existingFilter = JSON.parse(unparsedFilters)
    localStorage.setItem(
      localStorageKey,
      JSON.stringify([
        ...existingFilter.filter(
          (filter: any) => filter.userId !== (currentUser as any).value.userId
        ),
        {
          userId: currentUser.value.userId,
          filter: filterChoices,
        },
      ])
    )
  } else {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify([
        {
          userId: currentUser.value.userId,
          filter: filterChoices,
        },
      ])
    )
  }
}

export const getDynamicPaginationLimit = () => {
  const INNER_HEIGHT = window.innerHeight
  const REPORTING_NAV_HEIGHT = 56
  const TABLE_HEADER_HEIGHT = 100
  const PAGINATION_HEIGHT = 40
  const ROWS_HEIGHT = 32
  return Number(
    (
      (INNER_HEIGHT -
        REPORTING_NAV_HEIGHT -
        TABLE_HEADER_HEIGHT -
        PAGINATION_HEIGHT) /
      ROWS_HEIGHT
    ).toFixed(0)
  )
}

export const downloadBlobFile = (fileName: string, fileData: Blob) => {
  if (window.URL.createObjectURL) {
    const url = window.URL.createObjectURL(fileData)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)

    link.click()
    document.body.removeChild(link)
  }

  return fileData.size
}
