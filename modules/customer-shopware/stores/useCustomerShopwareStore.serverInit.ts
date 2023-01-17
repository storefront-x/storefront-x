import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'

export default () => {
  const customerStore = useCustomerStore()
  const getCustomer = useGetCustomer()

  return async () => {
    const { customer } = await getCustomer()

    customerStore.$patch({ customer })
  }
}
