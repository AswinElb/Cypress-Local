import { validatePartnerAuthenticity } from '@/api/util'
import { CUSTOM_TOKEN, SCHEDULER_CUSTOM_TOKEN } from '@/constants/auth'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

const headers: {
  'Content-Type': string
  Authorization?: string
} = { 'Content-Type': 'application/json' }

const CUSTOM_AUTH_HEADER = 'Custom-Token' as const
// const AUTHORIZATION_VALUE_PREFIX = 'Bearer' as const
const TOTAL_COUNT = 'X-Total-Count' as const
// const ID_VALUE_PREFIX = 'ID' as const
const X_API_KEY = 'X-API-KEY' as const
const VERIFICATION_INFO = 'X-Verification-Info' as const

// function buildHeaderValue(
//   prefix: typeof AUTHORIZATION_VALUE_PREFIX | typeof ID_VALUE_PREFIX,
//   token: string
// ) {
//   return `${prefix} ${token}`
// }
/**
 * Interceptor to add Access Token header for all requests.
 *
 * @param {object} request
 * @returns {object}
 */
const requestInterceptor = (
  request: AxiosRequestConfig
): AxiosRequestConfig => {
  // Add code for request interceptor.
  // const accessToken = Cookies.get(ACCESS_TOKEN)
  const customToken = Cookies.get(CUSTOM_TOKEN)

  // if (accessToken) {
  //   request.headers[AUTHORIZATION_HEADER] = buildHeaderValue(
  //     AUTHORIZATION_VALUE_PREFIX,
  //     accessToken
  //   )
  // }

  if (!request.headers) {
    return request
  }

  if (customToken) {
    request.headers[CUSTOM_AUTH_HEADER] = customToken
  }

  return request
}

/**
 * Interceptor to add pagination data to meta.
 *
 * @param {object} request
 * @returns {object}
 */
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  const total = response.headers[TOTAL_COUNT.toLowerCase()]

  response.data = {
    data: response.data,
    meta: {
      total,
    },
  }

  return response
}

const responseRejectedInterceptor = async (error: AxiosError) => {
  // const accessToken = Cookies.get(ACCESS_TOKEN)

  const urlParams = new URLSearchParams(window.location.search)

  const iframe = urlParams.get('iframe')
  const email = urlParams.get('email')
  const organizationId = urlParams.get('organizationId')
  const sid = urlParams.get('sid')

  if (error.response?.status === 401 && iframe && email && organizationId) {
    try {
      await validatePartnerAuthenticity(
        email,
        Number(organizationId),
        sid as string
      )
      http(error.response.config)
    } catch (error) {
      // console.log(error)
    }
  }
}

const scheduleRequestInterceptor = (
  request: AxiosRequestConfig
): AxiosRequestConfig => {
  const apiKey = import.meta.env.VITE_SCHEDULER_API_KEY
  const schedulerCustomToken = Cookies.get(SCHEDULER_CUSTOM_TOKEN)

  if (!request.headers) {
    return request
  }

  if (apiKey) {
    request.headers[X_API_KEY] = apiKey
  }

  if (schedulerCustomToken) {
    request.headers[CUSTOM_AUTH_HEADER] = schedulerCustomToken
  }

  // add
  const params = new URLSearchParams(document.location.search)
  const email = params.get('email')
  const organizationId = params.get('organizationId')
  if (email && organizationId) {
    request.headers[VERIFICATION_INFO] = `${email}:${organizationId}`
  }

  return request
}

const http = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL as string,
  headers: headers,
})

const httpBlob = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL as string,
  headers: headers,
  responseType: 'blob',
})

const scheduleReportHttp = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL as string,
  headers: headers,
})

scheduleReportHttp.interceptors.request.use(scheduleRequestInterceptor)

http.interceptors.request.use(requestInterceptor)
http.interceptors.response.use(responseInterceptor, responseRejectedInterceptor)

httpBlob.interceptors.request.use(requestInterceptor)
httpBlob.interceptors.response.use(
  responseInterceptor,
  responseRejectedInterceptor
)

const BASE_URL = import.meta.env.VITE_BACK_END_URL

export { http, httpBlob, scheduleReportHttp, headers, BASE_URL }
