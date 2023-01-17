import useCustomerTokenIdent from '#ioc/composables/useCustomerTokenIdent'
import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import isAuthorizationError from '#ioc/utils/graphql/isAuthorizationError'

export default () => {
  const customerStore = useCustomerStore()
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const customerTokenIdent = useCustomerTokenIdent()

  return async (error: any) => {
    if (isAuthorizationError(error)) {
      localStorage.removeItem(customerTokenIdent)
      customerStore.$patch({ customer: null })
      cartStore.$reset()
      checkoutStore.$reset()

      throw new CustomerNotAuthorized()
    }
  }
}
