import useCookies from '#ioc/composables/useCookies'
import useProduct from '#ioc/composables/useProduct'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useCreateCompareListId from '#ioc/services/useCreateCompareListId'
import useCustomer from '#ioc/composables/useCustomer'
import useAddProductsToCompareListRepository from '#ioc/repositories/useAddProductsToCompareListRepository'

export default () => {
  const compareProductsStore = useCompareProductsStore()
  const addProductsToCompareListRepository = useAddProductsToCompareListRepository()
  const createCompareListId = useCreateCompareListId()
  const customer = useCustomer()
  const cookies = useCookies()

  return async (product: ReturnType<typeof useProduct>) => {
    compareProductsStore.items.push(product.sku)
    if (customer.isLoggedIn) {
      const { id } = await createCompareListId()

      await addProductsToCompareListRepository({ uid: id, products: [product.id] })
    }
    cookies.set(COMPARE_PRODUCTS_COOKIE_NAME, compareProductsStore.items, { path: '/' })
  }
}
