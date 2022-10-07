import isString from '#ioc/utils/isString'

/**
 * Returns true if value is valid email.
 * Uses Magento 2 regular expression from validation-mixin.js.
 */
export default (value: string): boolean => {
  if (!isString(value)) return false

  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value,
  )
}
