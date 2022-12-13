export default function min(value, length) {
  return value?.length >= length || this.$t('validators.min', [length])
}
