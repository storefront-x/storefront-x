import isPhone from '#ioc/utils/validation/isPhone'

export default function email(value: any) {
  return isPhone(value) || 'Invalid phone format'
}
