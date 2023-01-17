import useCustomerToken from '#ioc/composables/useCustomerToken'
import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import isAuthorizationError from '#ioc/utils/graphql/isAuthorizationError'

export default () => {
  const customerStore = useCustomerStore()
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const customerToken = useCustomerToken()

  return async (error: any) => {
    if (isAuthorizationError(error)) {
      customerToken.remove()
      customerStore.$patch({ customer: null })
      cartStore.$reset()
      checkoutStore.$reset()

      throw new CustomerNotAuthorized()
    }
  }
}
