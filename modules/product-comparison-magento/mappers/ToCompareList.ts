import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'
import ToCompareItem from '#ioc/mappers/ToCompareItem'

export default (data: any) => ({
  comparisonListId: data?.uid ?? '',
  items: data?.items.map(ToCompareItem) ?? [],
  attributes: data?.attributes.map(ToCompareAttribute) ?? [],
})
