import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'
import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'
import useCustomerTokenIdent from '#ioc/composables/useCustomerTokenIdent'

export default () => {
  const customerStore = useCustomerStore()
  const customerMagentoStore = useCustomerMagentoStore()
  const getCustomer = useGetCustomer()
  const customerTokenIdent = useCustomerTokenIdent()

  return async () => {
    const id = localStorage.getItem(customerTokenIdent)

    customerMagentoStore.$patch({ customerId: id })

    if (customerMagentoStore.customerId) {
      const { customer } = await getCustomer()
      customerStore.$patch({ customer })
    } else {
      customerStore.$patch({ customer: null })
    }
  }
}
