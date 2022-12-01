import isTruthy from '#ioc/utils/validation/isTruthy'

export default function required(value) {
  return isTruthy(value) || this.$t('validators.required')
}
