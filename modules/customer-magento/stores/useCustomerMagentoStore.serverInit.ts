import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useCookies from '#ioc/composables/useCookies'
import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'

export default () => {
  const cookies = useCookies()
  const customerStore = useCustomerStore()
  const customerMagentoStore = useCustomerMagentoStore()
  const getCustomer = useGetCustomer()

  return async () => {
    const id = cookies.get(MAGENTO_CUSTOMER_COOKIE_NAME)
    customerMagentoStore.$patch({ customerId: id })
    if (customerMagentoStore.customerId) {
      const { customer } = await getCustomer()
      customerStore.$patch({ customer })
    } else {
      customerStore.$patch({ customer: null })
    }
  }
}
