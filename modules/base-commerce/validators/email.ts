import isEmail from '#ioc/utils/validation/isEmail'

export default function email(value: any) {
  return isEmail(value) || 'Invalid email format'
}
