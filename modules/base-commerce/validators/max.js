export default function max(value, length) {
  return value?.length < length || this.$t('Maximum {0} characters', [length])
}
