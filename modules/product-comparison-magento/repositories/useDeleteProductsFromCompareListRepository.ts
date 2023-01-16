import RemoveProductsFromCompareList from '#ioc/graphql/mutations/RemoveProductsFromCompareList'
import useMagento from '#ioc/composables/useMagento'
import ToCompareItem from '#ioc/mappers/ToCompareItem'
import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'

export default () => {
  const magento = useMagento()

  return async (input: any) => {
    const { data } = await magento.graphql(RemoveProductsFromCompareList().with({ input }))

    return {
      attributes: data.removeProductsFromCompareList.attributes.map(ToCompareAttribute) ?? [],
      items: data.removeProductsFromCompareList.items.map(ToCompareItem) ?? [],
    }
  }
}
