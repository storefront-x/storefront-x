import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CART_COOKIE_NAME from '#ioc/config/MAGENTO_CART_COOKIE_NAME'
import Extension from '#ioc/types/base/Extension'
import UseLoginCustomer from '#ioc/types/UseLoginCustomer'

const useLoginCustomer: Extension<UseLoginCustomer> = (useLoginCustomer) => {
  return () => {
    const loginCustomer = useLoginCustomer()
    const cookies = useCookies()

    return async (email, password, options) => {
      await loginCustomer(...args)

      cookies.remove(MAGENTO_CART_COOKIE_NAME)
    }
  }
}

export default useLoginCustomer
