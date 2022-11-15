import useCustomerStore from '#ioc/stores/useCustomerStore'
import CustomerNotVerified from '#ioc/errors/CustomerNotVerified'

export default () => {
  const customerStore = useCustomerStore()

  if (!customerStore.customer) {
    throw new CustomerNotVerified()
  }
}
