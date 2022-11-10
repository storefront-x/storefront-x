export default function min(value, length) {
  return value?.length >= length || this.$t('at_least', [length])
}
