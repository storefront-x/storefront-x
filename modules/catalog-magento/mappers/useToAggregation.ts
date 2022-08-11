import useToAggregationOption from '#ioc/mappers/useToAggregationOption'

export default () => {
  const toAggregationOption = useToAggregationOption()
  return (data: any) => ({
    attributeCode: data.attribute_code ?? '',
    count: data.count ?? 0,
    label: data.label ?? '',
    options: data.options.map(toAggregationOption) ?? [],
  })
}
