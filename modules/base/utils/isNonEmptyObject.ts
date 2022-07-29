import isObject from '#ioc/utils/isObject'

export default (val: any): boolean => isObject(val) && Object.keys(val).length > 0
