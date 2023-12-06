import localizedText from '@/locale/en-US/index'
import get from 'lodash/fp/get'
import template from 'lodash/fp/template'
import last from 'lodash/fp/last'

export function getLocalizedText(key: string) {
  return get(key)(localizedText) || key
}

export function getInterpolatedText(
  key: string,
  replacement: Record<string, any>,
  count: number
) {
  const message: string = getLocalizedText(key)
  const splitMessages = message.split(' | ')
  if (splitMessages[count]) {
    return template(splitMessages[count])(replacement)
  }

  return template(last(splitMessages) as string)(replacement)
}
