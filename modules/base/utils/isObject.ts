import isArray from '#ioc/utils/isArray'
import isFunction from '#ioc/utils/isFunction'

export default (val: any): val is Record<any, any> => val === Object(val) && !isArray(val) && !isFunction(val)
