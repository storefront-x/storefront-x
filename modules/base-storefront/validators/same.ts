export default function same(this: any, value: any, field: any) {
  const data = this.$Form.getData()

  const label = this.$Form.inputs[field].label ?? field

  return value === data[field] || 'Must be same as field' //this.$t('Must be same as "{0}" field', [label])
}
