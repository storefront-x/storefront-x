import useProduct from '#ioc/composables/useProduct'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useAddProductsToCompareListRepository from '#ioc/repositories/useAddProductsToCompareListRepository'
import useCustomer from '#ioc/composables/useCustomer'
import useCreateCompareList from '#ioc/services/useCreateCompareList'
import useComparisonListLocaleId from '#ioc/composables/useComparisonListLocaleId'
import useComparison from '#ioc/composables/useComparison'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const addProductsToCompareListRepository = useAddProductsToCompareListRepository()
  const comparisonListLocaleId = useComparisonListLocaleId()
  const customer = useCustomer()
  const comparison = useComparison()
  const createCompareList = useCreateCompareList()

  return async (product: ReturnType<typeof useProduct>) => {
    if (!comparison.comparisonListId) {
      const { compareList } = await createCompareList()

      productComparisonMagentoStore.$patch({ compareList })
      if (!customer.isLoggedIn) {
        comparisonListLocaleId.set(comparison.comparisonListId)
      }
    }
    const { compareList } = await addProductsToCompareListRepository({
      products: [product.id],
      uid: comparison.comparisonListId,
    })

    productComparisonMagentoStore.$patch({ compareList })
  }
}
