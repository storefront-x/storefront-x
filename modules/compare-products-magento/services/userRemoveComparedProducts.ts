import useCookies from '#ioc/composables/useCookies'
import useProduct from '#ioc/composables/useProduct'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'
import useDeleteProductsFromCompareListRepository from '#ioc/repositories/useDeleteProductsFromCompareListRepository'
import useCustomer from '#ioc/composables/useCustomer'

export default () => {
  const compareProductsStore = useCompareProductsStore()
  const deleteProductsFromCompareList = useDeleteProductsFromCompareListRepository()
  const cookies = useCookies()

  return async (product: ReturnType<typeof useProduct>) => {
    try {
      const removeIndex = compareProductsStore.items.indexOf(product.sku)

      const customer = useCustomer()

      compareProductsStore.items.splice(removeIndex, 1)
      console.log('removing service NOT LOGGED', product.id)
      if (customer.isLoggedIn) {
        console.log('removing service', product.id)
        await deleteProductsFromCompareList({ uid: compareProductsStore.compareListId, products: [product.id] })
      }

      if (compareProductsStore.items.length) {
        cookies.set(COMPARE_PRODUCTS_COOKIE_NAME, compareProductsStore.items, { path: '/' })
      } else {
        cookies.remove(COMPARE_PRODUCTS_COOKIE_NAME)
      }
    } catch (error) {
      console.log('chyba', error)
    }
  }
}
