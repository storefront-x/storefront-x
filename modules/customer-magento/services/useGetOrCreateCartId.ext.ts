import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import useGetCustomerCartId from '#ioc/services/useGetCustomerCartId'

export default <T extends (...args: any[]) => any>(useGetOrCreateCartId: T) => {
  return (): ReturnType<T> => {
    const cookies = useCookies()
    const getOrCreateCartId = useGetOrCreateCartId()
    const getCustomerCartId = useGetCustomerCartId()

    const token = cookies.get(MAGENTO_CUSTOMER_COOKIE_NAME)

    if (token) {
      return getCustomerCartId as ReturnType<T>
    } else {
      return getOrCreateCartId
    }
  }
}
