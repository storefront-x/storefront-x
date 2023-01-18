import useProduct from '#ioc/composables/useProduct'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useAddProductsToCompareListRepository from '#ioc/repositories/useAddProductsToCompareListRepository'
import useCustomer from '#ioc/composables/useCustomer'
import useCreateCompareList from '#ioc/services/useCreateCompareList'
import useComparisonListLocaleId from '#ioc/composables/useComparisonListLocaleId'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const addProductsToCompareListRepository = useAddProductsToCompareListRepository()
  const comparisonListLocaleId = useComparisonListLocaleId()
  const customer = useCustomer()
  const createCompareList = useCreateCompareList()

  return async (product: ReturnType<typeof useProduct>) => {
    if (!productComparisonMagentoStore.comparisonListId) {
      const { comparisonListId } = await createCompareList()

      productComparisonMagentoStore.comparisonListId = comparisonListId
      if (!customer.isLoggedIn) {
        comparisonListLocaleId.set(comparisonListId)
      }
    }
    const { compareList } = await addProductsToCompareListRepository({
      products: [product.id],
      uid: productComparisonMagentoStore.comparisonListId,
    })

    productComparisonMagentoStore.$patch(compareList)
  }
}
