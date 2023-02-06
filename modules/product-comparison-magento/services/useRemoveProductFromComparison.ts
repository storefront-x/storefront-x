import useProduct from '#ioc/composables/useProduct'
import useProductComparisonStore from '#ioc/stores/useProductComparisonStore'
import useDeleteProductsFromCompareListRepository from '#ioc/repositories/useDeleteProductsFromCompareListRepository'

export default () => {
  const productComparisonStore = useProductComparisonStore()
  const deleteProductsFromCompareListRepository = useDeleteProductsFromCompareListRepository()

  return async (product: ReturnType<typeof useProduct>) => {
    const productComparison = await deleteProductsFromCompareListRepository({
      products: [product.id],
      uid: productComparisonStore.compareList?.id,
    })

    productComparisonStore.$patch(productComparison)
  }
}
