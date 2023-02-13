import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'
import ToCompareItem from '#ioc/mappers/ToCompareItem'

export default (data: any) => ({
  id: data.uid ?? '',
  itemCount: data.item_count ?? 0,
  items: data.items?.map(ToCompareItem) ?? [],
  attributes: data.attributes?.map(ToCompareAttribute) ?? [],
})
