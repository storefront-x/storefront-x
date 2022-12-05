import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import isAuthorizationError from '#ioc/utils/graphql/isAuthorizationError'

export default () => {
  const cookies = useCookies()
  const customerStore = useCustomerStore()
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()

  return async (error: any) => {
    if (isAuthorizationError(error)) {
      cookies.remove(MAGENTO_CUSTOMER_COOKIE_NAME)
      customerStore.$patch({ customer: null })
      cartStore.$reset()
      checkoutStore.$reset()

      throw new CustomerNotAuthorized()
    }
  }
}
