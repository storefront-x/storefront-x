import useProduct from '#ioc/composables/useProduct'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useDeleteProductsFromCompareListRepository from '#ioc/repositories/useDeleteProductsFromCompareListRepository'
import useComparison from '#ioc/composables/useComparison'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const deleteProductsFromCompareListRepository = useDeleteProductsFromCompareListRepository()
  const comparison = useComparison()

  return async (product: ReturnType<typeof useProduct>) => {
    const { compareList } = await deleteProductsFromCompareListRepository({
      products: [product.id],
      uid: comparison.comparisonListId,
    })

    productComparisonMagentoStore.$patch({ compareList })
  }
}
