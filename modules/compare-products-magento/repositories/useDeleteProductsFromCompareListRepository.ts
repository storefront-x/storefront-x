import DeleteProductsFromCompareList from '#ioc/graphql/mutations/DeleteProductsFromCompareList'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (input: any) => {
    const { data } = await magento.graphql(DeleteProductsFromCompareList().with({ input }))
  }
}
