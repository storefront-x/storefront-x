import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'
import UseLoginCustomer from '#ioc/types/UseLoginCustomer'

const useLoginCustomer: UseLoginCustomer = () => {
  const cookies = useCookies()
  const loginCustomerRepository = useLoginCustomerRepository()

  return async (email, password, options = {}) => {
    const { token } = await loginCustomerRepository(email, password)

    cookies.set(MAGENTO_CUSTOMER_COOKIE_NAME, token, { path: '/' })

    if (options.redirect) {
      window.location.href = options.redirect
    } else {
      window.location.reload()
    }
  }
}

export default useLoginCustomer
