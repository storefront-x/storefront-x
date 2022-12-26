import RemoveProductsFromCompareList from '#ioc/graphql/mutations/RemoveProductsFromCompareList'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (input: any) => {
    const { data } = await magento.graphql(RemoveProductsFromCompareList().with({ input }))
  }
}
