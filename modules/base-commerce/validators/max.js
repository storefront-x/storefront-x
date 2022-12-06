export default function max(value, length) {
  return value?.length < length || this.$t('validators.max', [length])
}
