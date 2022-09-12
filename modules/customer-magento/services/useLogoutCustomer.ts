import useLogoutCustomerRepository from '#ioc/repositories/useLogoutCustomerRepository'
import useCookies from '#ioc/composables/useCookies'
import useLocalePath from '#ioc/composables/useLocalePath'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import useCartMagentoStore from '#ioc/stores/useCartMagentoStore'

export default () => {
  const localePath = useLocalePath()
  const cookies = useCookies()
  const logoutCustomerRepository = useLogoutCustomerRepository()
  const cartMagentoStore = useCartMagentoStore()

  return async () => {
    await logoutCustomerRepository()

    cookies.remove(MAGENTO_CART_COOKIE_NAME, { path: '/' })
    cookies.remove(MAGENTO_CUSTOMER_COOKIE_NAME, { path: '/' })

    cartMagentoStore.$patch({ cartId: '' })

    window.location.href = localePath('sign-in').fullPath
  }
}
