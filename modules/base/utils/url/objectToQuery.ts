import isArray from '#ioc/utils/isArray'
import isNullish from '#ioc/utils/isNullish'
import isObject from '#ioc/utils/isObject'

export default (object: any, { arraySeparator }: any = {}) => {
  if (isNullish(object)) return ''

  return Object.keys(object)
    .filter((key) => !isNullish(object[key]))
    .map((key) => {
      if (isArray(object[key])) {
        if (arraySeparator) {
          return key + '=' + object[key].map((value: string) => encodeURIComponent(value)).join(arraySeparator)
        } else {
          return object[key].map((value: string) => key + '=' + encodeURIComponent(value)).join('&')
        }
      } else if (isObject(object[key])) {
        return key + '=' + encodeURIComponent(JSON.stringify(object[key]))
      } else {
        return key + '=' + encodeURIComponent(object[key])
      }
    })
    .join('&')
}
