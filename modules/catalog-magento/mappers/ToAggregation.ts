import ToAggregationOption from '#ioc/mappers/ToAggregationOption'

export default (data: any) => ({
  attributeCode: data.attribute_code ?? '',
  count: data.count ?? 0,
  label: data.label ?? '',
  options: data.options.map(ToAggregationOption) ?? [],
})
