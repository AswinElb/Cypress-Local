import Cookies from 'js-cookie'

export const setCookies = (key: string, value: any, expiry?: number | Date) => {
  const nodeEnv = import.meta.env.VITE_FRONTEND_NODE_ENV

  Cookies.set(key, value, {
    expires: expiry,
    sameSite: nodeEnv !== 'local' ? 'None' : 'Lax',
    secure: nodeEnv !== 'local' ? true : false,
  })
}
