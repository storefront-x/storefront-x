import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'
import useCustomerToken from '#ioc/composables/useCustomerToken'

export default () => {
  const customerMagentoStore = useCustomerMagentoStore()
  const customerToken = useCustomerToken()

  return async () => {
    const id = customerToken.get()

    customerMagentoStore.$patch({ customerId: id })
  }
}
