import useCustomerStore from '#ioc/stores/useCustomerStore'
import CustomerNotVerified from '#ioc/errors/CustomerNotVerified'

export default () => {
  const customerStore = useCustomerStore()

  return () => {
    if (!customerStore.customer) {
      throw new CustomerNotVerified()
    }
  }
}
