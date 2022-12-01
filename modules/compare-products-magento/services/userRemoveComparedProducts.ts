import useCookies from '#ioc/composables/useCookies'
import useProduct from '#ioc/composables/useProduct'
import COMPARE_PRODUCTS_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_COOKIE_NAME'
import useCompareProductsStore from '#ioc/stores/useCompareProductsStore'

export default () => {
  const compareProductsStore = useCompareProductsStore()
  const cookies = useCookies()

  return async (product: ReturnType<typeof useProduct>) => {
    const removeIndex = compareProductsStore.items.indexOf(product.sku)
    compareProductsStore.items.splice(removeIndex, 1)
    if (compareProductsStore.items.length) {
      cookies.set(COMPARE_PRODUCTS_COOKIE_NAME, compareProductsStore.items, { path: '/' })
    } else {
      cookies.remove(COMPARE_PRODUCTS_COOKIE_NAME)
    }
  }
}
