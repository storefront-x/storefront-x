import isArray from '#ioc/utils/isArray'
import isNullish from '#ioc/utils/isNullish'
import isObject from '#ioc/utils/isObject'
import isString from '#ioc/utils/isString'

/**
 * Returns boolean whether the parameter is empty (nullish or empty string/array/object)
 */
export default (val: any): boolean => {
  if (isNullish(val)) return true
  if (isString(val) && val.length === 0) return true
  if (isArray(val) && val.length === 0) return true
  if (isObject(val) && Object.keys(val).length === 0) return true

  return false
}
