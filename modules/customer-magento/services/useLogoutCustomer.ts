import useLogoutCustomerRepository from '#ioc/repositories/useLogoutCustomerRepository'
import useCookies from '#ioc/composables/useCookies'
import useLocalePath from '#ioc/composables/useLocalePath'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'
import COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME from '#ioc/config/COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME'

export default () => {
  const localePath = useLocalePath()
  const cookies = useCookies()
  const logoutCustomerRepository = useLogoutCustomerRepository()
  const cartMagentoStore = useCartMagentoStore()

  return async () => {
    await logoutCustomerRepository()

    cookies.remove(MAGENTO_CART_COOKIE_NAME)
    cookies.remove(MAGENTO_CUSTOMER_COOKIE_NAME)
    cookies.remove(COMPARE_PRODUCTS_STORE_ID_COOKIE_NAME)

    cartMagentoStore.$patch({ cartId: '' })

    window.location.href = localePath('sign-in')
  }
}
