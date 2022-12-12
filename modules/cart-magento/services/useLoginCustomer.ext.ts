import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'

export default (useLoginCustomer: any) => {
  return () => {
    const loginCustomer = useLoginCustomer()
    const cookies = useCookies()

    return async (...args: any) => {
      await loginCustomer(...args)

      cookies.remove(MAGENTO_CART_COOKIE_NAME)
    }
  }
}
