import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useGetCompareList from '#ioc/services/useGetCompareList'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const getCompareList = useGetCompareList()

  return async () => {
    const { compareList } = await getCompareList()

    productComparisonMagentoStore.$patch({ compareList })
  }
}
