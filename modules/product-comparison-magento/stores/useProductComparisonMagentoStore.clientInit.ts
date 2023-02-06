import useProductComparisonStore from '#ioc/stores/useProductComparisonStore'
import useGetProductComparison from '#ioc/services/useGetProductComparison'

export default () => {
  const productComparisonMagentoStore = useProductComparisonStore()
  const getProductComparison = useGetProductComparison()

  return async () => {
    const productComparsion = await getProductComparison()

    productComparisonMagentoStore.$patch(productComparsion)
  }
}
