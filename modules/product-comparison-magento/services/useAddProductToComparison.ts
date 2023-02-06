import useProduct from '#ioc/composables/useProduct'
import useProductComparisonStore from '#ioc/stores/useProductComparisonStore'
import useAddProductsToCompareListRepository from '#ioc/repositories/useAddProductsToCompareListRepository'
import useCreateProductComparison from '#ioc/services/useCreateProductComparison'
import useCompareListId from '#ioc/composables/useCompareListId'

export default () => {
  const productComparisonStore = useProductComparisonStore()
  const reateProductComparison = useCreateProductComparison()
  const compareListId = useCompareListId()
  const addProductsToCompareListRepository = useAddProductsToCompareListRepository()

  return async (product: ReturnType<typeof useProduct>) => {
    if (!productComparisonStore.compareList?.id) {
      const productComparison = await reateProductComparison()

      productComparisonStore.$patch(productComparison)
      compareListId.set(productComparison.compareList.id)
    }

    const productComparison = await addProductsToCompareListRepository({
      products: [product.id],
      uid: productComparisonStore.compareList?.id,
    })

    productComparisonStore.$patch(productComparison)
  }
}
