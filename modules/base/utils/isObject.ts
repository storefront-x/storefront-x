import isArray from '#ioc/utils/isArray'
import isFunction from '#ioc/utils/isFunction'

export default (val: any): boolean => val === Object(val) && !isArray(val) && !isFunction(val)
