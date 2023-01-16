import useProduct from '#ioc/composables/useProduct'
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useAddProductsToCompareListRepository from '#ioc/repositories/useAddProductsToCompareListRepository'
import useCustomer from '#ioc/composables/useCustomer'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'

export default () => {
  const compareProductsStore = useCompareProductsStore()
  const addProductsToCompareListRepository = useAddProductsToCompareListRepository()
  const customer = useCustomer()
  const cookies = useCookies()

  return async (product: ReturnType<typeof useProduct>) => {
    const { items, attributes } = await addProductsToCompareListRepository({
      products: [product.id],
      uid: compareProductsStore.compareListId,
    })

    compareProductsStore.$patch({ items, attributes })

    if (!customer.isLoggedIn) {
      const productIds = compareProductsStore.items.map((item) => item.product.id)
      cookies.set(COMPARE_PRODUCTS_COOKIE_NAME, productIds, { path: '/' })
    }
  }
}
