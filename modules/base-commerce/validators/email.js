import isEmail from '#ioc/utils/validation/isEmail'

export default function email(value) {
  return isEmail(value) || this.$t('validators.email')
}
