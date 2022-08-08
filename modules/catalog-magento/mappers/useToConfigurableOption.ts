import useToConfigurableOptionValue from '#ioc/mappers/useToConfigurableOptionValue'

export default () => {
  const toConfigurableOptionValue = useToConfigurableOptionValue()

  return (data: any) => ({
    id: data.id || 0,
    label: data.label || '',
    values: data.values.map(toConfigurableOptionValue),
    attributeCode: data.attribute_code || '',
  })
}
