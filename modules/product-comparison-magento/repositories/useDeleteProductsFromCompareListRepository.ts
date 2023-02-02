import RemoveProductsFromCompareList from '#ioc/graphql/mutations/RemoveProductsFromCompareList'
import useMagento from '#ioc/composables/useMagento'
import ToCompareList from '#ioc/mappers/ToCompareList'

export default () => {
  const magento = useMagento()

  return async (input: any) => {
    const { data } = await magento.graphql(RemoveProductsFromCompareList().with({ input }))

    return {
      compareList: ToCompareList(data.removeProductsFromCompareList),
    }
  }
}
