import ToConfigurableOptionValue from '#ioc/mappers/ToConfigurableOptionValue'

export default (data: any) => ({
  id: data.id || 0,
  label: data.label || '',
  values: data.values.map(ToConfigurableOptionValue),
  attributeCode: data.attribute_code || '',
})
