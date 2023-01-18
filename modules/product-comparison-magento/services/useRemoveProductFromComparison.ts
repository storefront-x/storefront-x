import useProduct from '#ioc/composables/useProduct'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useDeleteProductsFromCompareListRepository from '#ioc/repositories/useDeleteProductsFromCompareListRepository'
import useCustomer from '#ioc/composables/useCustomer'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const deleteProductsFromCompareList = useDeleteProductsFromCompareListRepository()
  const customer = useCustomer()

  return async (product: ReturnType<typeof useProduct>) => {
    const { items, attributes } = await deleteProductsFromCompareList({
      products: [product.id],
      uid: productComparisonMagentoStore.comparisonListId,
    })

    productComparisonMagentoStore.$patch({ items, attributes })

    if (!customer.isLoggedIn) {
      const productIds = productComparisonMagentoStore.items.map((item) => item.product.id)
    }
  }
}
