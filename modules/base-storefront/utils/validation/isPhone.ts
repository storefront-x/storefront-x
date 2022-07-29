import isString from '#ioc/utils/isString'

export default (value: string) => {
  if (!isString(value)) return false

  return /^(\+\d{1,3})? ?\d+$/.test(value)
}
