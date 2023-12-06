import {
  CUSTOM_TOKEN,
  RLP_USER_INFO,
  SCHEDULER_CUSTOM_TOKEN,
} from '@/constants/auth'
import { TOKEN_EXPIRY_CONVERSION } from '@/constants/date'
import { useLoggedInUserStore } from '@/store'
import { validatePartner } from './calls'
import { setCookies } from './cookies'

export const validatePartnerAuthenticity = async (
  email: string,
  organizationId: number,
  sid: string
) => {
  const userStore = useLoggedInUserStore()

  const { data: res } = await validatePartner({
    email,
    organizationId,
    sid,
  })

  // set local token from the response and use it in the reporting
  const timeNow = new Date().getTime()

  // const accessTokenExpiry = new Date(timeNow + res.data.expires_in * 1000)

  // setCookies(ACCESS_TOKEN, res.data.access_token, accessTokenExpiry)

  setCookies(
    CUSTOM_TOKEN,
    res.data.custom_token,
    new Date(timeNow + TOKEN_EXPIRY_CONVERSION)
  )

  setCookies(SCHEDULER_CUSTOM_TOKEN, res.data.scheduler_custom_token)

  localStorage.setItem(RLP_USER_INFO, JSON.stringify(res.data))
  const currentUser = {
    userId: res.data.user_id,
    userRoleId: res.data.user_role_id,
    permissions: {
      enterpriseIds: res.data.enterprise_id,
      officeIds: res.data.office_ids,
      organizationId: res.data.organization_id,
    },
  }

  userStore.updateCurrentUser(currentUser)
  return currentUser
}
