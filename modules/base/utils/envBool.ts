import isNullish from '#ioc/utils/isNullish'

export default (value: any, defaultValue: boolean): boolean => {
  if (!isNullish(value)) return value === true

  return defaultValue
}
