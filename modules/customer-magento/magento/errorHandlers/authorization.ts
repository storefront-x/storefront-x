import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import AuthorizationError from '#ioc/errors/AuthorizationError'
import useCustomerStore from '#ioc/stores/useCustomerStore'
import IS_CLIENT from '#ioc/config/IS_CLIENT'

export default () => {
  const cookies = useCookies()
  const customerStore = useCustomerStore()

  return async (error: any) => {
    if (error?.extensions?.category === 'graphql-authorization') {
      cookies.remove(MAGENTO_CUSTOMER_COOKIE_NAME)
      customerStore.$patch({ customer: null })
      if (IS_CLIENT) {
        throw new AuthorizationError()
      }
    }
  }
}
