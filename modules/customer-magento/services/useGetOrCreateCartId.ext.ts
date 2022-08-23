import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useGetCustomerCartId from '#ioc/services/useGetCustomerCartId'
import useGetOrCreateCartId from '@storefront-x/cart-magento/services/useGetOrCreateCartId'

export default (self: typeof useGetOrCreateCartId) => () => {
  const cookies = useCookies()
  const getOrCreateCartId = self()
  const getCustomerCartId = useGetCustomerCartId()

  const token = cookies.get(MAGENTO_CUSTOMER_COOKIE_NAME)

  if (token) {
    return getCustomerCartId
  } else {
    return getOrCreateCartId
  }
}
