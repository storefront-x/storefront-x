import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'
import useCookies from '#ioc/composables/useCookies'
import useGetCustomer from '#ioc/services/useGetCustomer'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useMergeCarts from '#ioc/services/useMergeCarts'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useCustomerMagentoStore from '#ioc/stores/useCustomerMagentoStore'

export default () => {
  const loginCustomerRepository = useLoginCustomerRepository()
  const getCustomer = useGetCustomer()
  const customerStore = useCustomerStore()
  const mergeCarts = useMergeCarts()
  const cookies = useCookies()
  const customerMagentoStore = useCustomerMagentoStore()

  return async (email: string, password: string) => {
    const { token } = await loginCustomerRepository(email, password)
    customerMagentoStore.$patch({ customerId: token })
    cookies.set(MAGENTO_CUSTOMER_COOKIE_NAME, token, { path: '/' })
    await mergeCarts()
    const { customer } = await getCustomer()
    customerStore.$patch({ customer })
  }
}
