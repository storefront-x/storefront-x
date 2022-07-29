import isArray from '#ioc/utils/isArray'
import isNullish from '#ioc/utils/isNullish'

export default (value: any): any[] => {
  if (isArray(value)) return value
  if (isNullish(value)) return []
  return [value]
}
