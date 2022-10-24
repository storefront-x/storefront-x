import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'
import useCookies from '#ioc/composables/useCookies'
import useGetCustomer from '#ioc/services/useGetCustomer'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import useMergeCarts from '#ioc/services/useMergeCarts'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'

export default () => {
  const loginCustomerRepository = useLoginCustomerRepository()
  const getCustomer = useGetCustomer()
  const customerStore = useCustomerStore()
  const mergeCarts = useMergeCarts()
  const cookies = useCookies()

  return async (email: string, password: string) => {
    const { token } = await loginCustomerRepository(email, password)
    cookies.set(MAGENTO_CUSTOMER_COOKIE_NAME, token, { path: '/' })
    await mergeCarts()
    const { customer } = await getCustomer()
    customerStore.$patch({ customer })
  }
}
