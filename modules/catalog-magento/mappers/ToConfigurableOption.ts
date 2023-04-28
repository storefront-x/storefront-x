import ToConfigurableOptionValue from '#ioc/mappers/ToConfigurableOptionValue'

export default (data: any) => ({
  id: data.id || 0,
  label: data.label || '',
  isDefault: data.use_default || false,
  isSwatch: data.values.some((value: any) => value.swatch_data?.value?.startsWith('#') ?? false),
  isDropdown: data.values.some((value: any) => value.swatch_data === null ?? false),
  values: data.values.map(ToConfigurableOptionValue),
  attributeCode: data.attribute_code || '',
})
