import isPhone from '#ioc/utils/validation/isPhone'

export default function email(value) {
  return isPhone(value) || this.$t('validators.phone')
}
