import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'
import useGetCustomer from '#ioc/services/useGetCustomer'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useMergeCarts from '#ioc/services/useMergeCarts'
import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'
import useCustomerToken from '#ioc/composables/useCustomerToken'

export default () => {
  const loginCustomerRepository = useLoginCustomerRepository()
  const getCustomer = useGetCustomer()
  const customerStore = useCustomerStore()
  const mergeCarts = useMergeCarts()
  const customerMagentoStore = useCustomerMagentoStore()
  const customerToken = useCustomerToken()

  return async (email: string, password: string) => {
    const { token } = await loginCustomerRepository(email, password)
    customerMagentoStore.$patch({ customerId: token })
    customerToken.set(token)
    await mergeCarts()
    const { customer } = await getCustomer()
    customerStore.$patch({ customer })
  }
}
