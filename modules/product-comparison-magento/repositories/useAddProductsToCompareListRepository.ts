import AddProductsToCompareList from '#ioc/graphql/mutations/AddProductsToCompareList'
import useMagento from '#ioc/composables/useMagento'
import ToCompareList from '#ioc/mappers/ToCompareList'

export default () => {
  const magento = useMagento()

  return async (input: any) => {
    const { data } = await magento.graphql(AddProductsToCompareList().with({ input }))

    return {
      compareList: ToCompareList(data.addProductsToCompareList),
    }
  }
}
