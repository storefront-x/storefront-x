export default function same(value, field) {
  const data = this.$Form.getData()

  const label = this.$Form.inputs[field].label ?? field

  return value === data[field] || this.$t('Must be same as "{0}" field', [label])
}
