export default function min(value: any, length: number) {
  return value?.length >= length || 'At least characters' //this.$t('At least {0} characters', [length])
}
