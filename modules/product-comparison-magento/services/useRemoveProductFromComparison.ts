import useProduct from '#ioc/composables/useProduct'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useDeleteProductsFromCompareListRepository from '#ioc/repositories/useDeleteProductsFromCompareListRepository'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const deleteProductsFromCompareListRepository = useDeleteProductsFromCompareListRepository()

  return async (product: ReturnType<typeof useProduct>) => {
    const { items, attributes } = await deleteProductsFromCompareListRepository({
      products: [product.id],
      uid: productComparisonMagentoStore.comparisonListId,
    })

    productComparisonMagentoStore.$patch({ items, attributes })
  }
}
