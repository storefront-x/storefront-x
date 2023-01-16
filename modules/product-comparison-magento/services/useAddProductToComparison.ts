import useProduct from '#ioc/composables/useProduct'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'
import useAddProductsToCompareListRepository from '#ioc/repositories/useAddProductsToCompareListRepository'
import useCustomer from '#ioc/composables/useCustomer'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'

export default () => {
  const productComparisonMagentoStore = useProductComparisonMagentoStore()
  const addProductsToCompareListRepository = useAddProductsToCompareListRepository()
  const customer = useCustomer()
  const cookies = useCookies()

  return async (product: ReturnType<typeof useProduct>) => {
    const { items, attributes } = await addProductsToCompareListRepository({
      products: [product.id],
      uid: productComparisonMagentoStore.compareListId,
    })

    productComparisonMagentoStore.$patch({ items, attributes })

    if (!customer.isLoggedIn) {
      const productIds = productComparisonMagentoStore.items.map((item) => item.product.id)
      cookies.set(COMPARE_PRODUCTS_COOKIE_NAME, productIds, { path: '/' })
    }
  }
}
