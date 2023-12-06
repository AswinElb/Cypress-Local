import { validateEnabledOrg } from '@/api/calls'
import { validatePartnerAuthenticity } from '@/api/util'
import {
  USER_SELECTED_PAGE,
  USER_SELECTED_ROUTE,
} from '@/pages/Reports/constants'
import { Pages } from '@/store'

export const fetchUserInfo = async (
  email: string,
  organizationId: number,
  sid: string
) => {
  await validatePartnerAuthenticity(email, organizationId, sid)
}

export const getValidateOrg = (organizationId: number) => {
  return validateEnabledOrg({
    organizationId,
  })
}

export const saveUserSelectedRoute = (route: string) => {
  localStorage.setItem(USER_SELECTED_ROUTE, route)
}

export const saveUserSelectedPage = (page: Pages) => {
  sessionStorage.setItem(USER_SELECTED_PAGE, page)
}
