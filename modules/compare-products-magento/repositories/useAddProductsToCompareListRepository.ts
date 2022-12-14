import AddProductsToCompareList from '#ioc/graphql/mutations/AddProductsToCompareList'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (input: any) => {
    console.log('add to compare input', input)
    const { data } = await magento.graphql(AddProductsToCompareList().with({ input }))
  }
}
