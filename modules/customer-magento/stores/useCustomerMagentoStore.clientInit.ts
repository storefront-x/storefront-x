import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'
import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'
import useCustomerToken from '#ioc/composables/useCustomerToken'

export default () => {
  const customerStore = useCustomerStore()
  const customerMagentoStore = useCustomerMagentoStore()
  const getCustomer = useGetCustomer()
  const customerToken = useCustomerToken()

  return async () => {
    const id = customerToken.get()

    customerMagentoStore.$patch({ customerId: id })

    if (customerMagentoStore.customerId) {
      const { customer } = await getCustomer()
      customerStore.$patch({ customer })
    } else {
      customerStore.$patch({ customer: null })
    }
  }
}
