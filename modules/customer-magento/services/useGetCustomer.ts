import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useGetCustomerRepository from '#ioc/repositories/useGetCustomerRepository'
import isAuthorizationError from '#ioc/utils/graphql/isAuthorizationError'

export default () => {
  const cookies = useCookies()
  const getCustomerRepository = useGetCustomerRepository()

  return async (id: string): Promise<ReturnType<typeof getCustomerRepository>> => {
    if (id) {
      try {
        return await getCustomerRepository()
      } catch (error) {
        if (isAuthorizationError(error)) {
          cookies.remove(MAGENTO_CUSTOMER_COOKIE_NAME)
          return {
            customer: null,
          }
        } else {
          throw error
        }
      }
    } else {
      return {
        customer: null,
      }
    }
  }
}
