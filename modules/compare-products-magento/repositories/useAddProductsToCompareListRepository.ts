import AddProductsToCompareList from '#ioc/graphql/mutations/AddProductsToCompareList'
import useMagento from '#ioc/composables/useMagento'
import ToCompareItem from '#ioc/mappers/ToCompareItem'
import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'

export default () => {
  const magento = useMagento()

  return async (input: any) => {
    const { data } = await magento.graphql(AddProductsToCompareList().with({ input }))

    return {
      attributes: data.addProductsToCompareList.attributes.map(ToCompareAttribute) ?? [],
      items: data.addProductsToCompareList.items.map(ToCompareItem) ?? [],
    }
  }
}
