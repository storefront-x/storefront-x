import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useCartStore from '#ioc/stores/useCartStore'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCustomerToken from '#ioc/composables/useCustomerToken'

export default () => {
  const customerStore = useCustomerStore()
  const cartStore = useCartStore()
  const checkoutStore = useCheckoutStore()
  const customerToken = useCustomerToken()
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof CustomerNotAuthorized) {
      customerToken.remove()
      customerStore.$patch({ customer: null })
      cartStore.$reset()
      checkoutStore.$reset()

      showErrorNotification(t('errors.authorizationError'))
    } else {
      throw error
    }
  }
}
