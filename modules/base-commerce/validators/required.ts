import isTruthy from '#ioc/utils/validation/isTruthy'

export default function required(value: any) {
  return isTruthy(value) || 'Required'
}
