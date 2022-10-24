import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'
import useCookies from '#ioc/composables/useCookies'
import useLocalePath from '#ioc/composables/useLocalePath'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'

interface Options {
  redirect?: boolean
}

export default () => {
  const localePath = useLocalePath()
  const cookies = useCookies()
  const loginCustomerRepository = useLoginCustomerRepository()

  return async (email: string, password: string, { redirect = true }: Options = {}) => {
    const { token } = await loginCustomerRepository(email, password)

    cookies.set(MAGENTO_CUSTOMER_COOKIE_NAME, token, { path: '/' })

    if (redirect) {
      window.location.href = localePath('/').fullPath
    }
  }
}
