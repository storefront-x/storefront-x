import isValidDate from '#ioc/utils/date/isValidDate'
import isString from '#ioc/utils/isString'

export default (value: string): Date | null => {
  if (!value) return null

  const date = new Date(value)
  if (isValidDate(date)) return date

  if (isString(value)) {
    const date = new Date(value.replace(' ', 'T'))
    if (isValidDate(date)) return date
  }

  return null
}
