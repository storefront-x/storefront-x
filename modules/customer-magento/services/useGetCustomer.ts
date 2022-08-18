import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useGetCustomerRepository from '#ioc/repositories/useGetCustomerRepository'

export default () => {
  const cookies = useCookies()
  const getCustomerRepository = useGetCustomerRepository()

  return async (
    ...args: Parameters<typeof getCustomerRepository>
  ): Promise<ReturnType<typeof getCustomerRepository>> => {
    if (cookies.get(MAGENTO_CUSTOMER_COOKIE_NAME)) {
      return await getCustomerRepository(...args)
    } else {
      return {
        customer: null,
      }
    }
  }
}
