export default function max(value: any, length: number) {
  return value?.length < length || 'Maximum characters' // this.$t('Maximum {0} characters', [length])
}
