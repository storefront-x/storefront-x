export default function min(value, length) {
  return value?.length >= length || this.$t('At least {0} characters', [length])
}
