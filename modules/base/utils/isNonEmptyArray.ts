import isArray from '#ioc/utils/isArray'

export default (val: any): boolean => isArray(val) && val.length > 0
