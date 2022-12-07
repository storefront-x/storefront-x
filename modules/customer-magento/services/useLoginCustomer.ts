import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'
import useCookies from '#ioc/composables/useCookies'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'

interface Options {
  redirect?: string
}

export default () => {
  const cookies = useCookies()
  const loginCustomerRepository = useLoginCustomerRepository()

  return async (email: string, password: string, options: Options = {}) => {
    const { token } = await loginCustomerRepository(email, password)

    cookies.set(MAGENTO_CUSTOMER_COOKIE_NAME, token, { path: '/' })

    if (options.redirect) {
      window.location.href = options.redirect
    } else {
      window.location.reload()
    }
  }
}
