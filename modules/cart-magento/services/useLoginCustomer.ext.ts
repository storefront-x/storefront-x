import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'

export default <T extends (...args: any[]) => any>(useCustomerLogin: T) => {
  return (): (() => Promise<any>) => {
    const customerLogin = useCustomerLogin()
    const cookies = useCookies()

    return async (...args) => {
      await customerLogin(...args)

      cookies.remove(MAGENTO_CART_COOKIE_NAME)
    }
  }
}
