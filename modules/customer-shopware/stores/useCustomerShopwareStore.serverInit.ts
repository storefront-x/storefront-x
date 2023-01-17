import useCustomerStore from '#ioc/stores/useCustomerStore'
import useGetCustomer from '#ioc/services/useGetCustomer'

export default async () => {
  const customerStore = useCustomerStore()
  const getCustomer = useGetCustomer()

  const { customer } = await getCustomer()

  customerStore.$patch({ customer })
}
