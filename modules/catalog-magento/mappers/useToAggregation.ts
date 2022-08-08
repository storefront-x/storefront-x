import useToAggregationOption from '#ioc/mappers/useToAggregationOption'
import CATALOG_FILTER_ATTRIBUTES_RANGE from '#ioc/config/CATALOG_FILTER_ATTRIBUTES_RANGE'
import first from '#ioc/utils/array/first'
import last from '#ioc/utils/array/last'

export default () => {
  const toAggregationOption = useToAggregationOption()
  return (data: any) => ({
    attributeCode: data.attribute_code ?? '',
    count: data.count ?? 0,
    label: data.label ?? '',
    options: data.options.map(toAggregationOption) ?? [],
    ranges: [],
  })
}
