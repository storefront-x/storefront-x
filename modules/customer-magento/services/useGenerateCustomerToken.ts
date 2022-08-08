import useGenerateCustomerTokenRepository from '#ioc/repositories/useGenerateCustomerTokenRepository'
import useCookies from '#ioc/composables/useCookies'
import useLocalePath from '#ioc/composables/useLocalePath'
import MAGENTO_CUSTOMER_COOKIE_NAME from '#ioc/config/MAGENTO_CUSTOMER_COOKIE_NAME'

interface Options {
  redirect?: true
}

export default () => {
  const localePath = useLocalePath()
  const cookies = useCookies()
  const generateCustomerTokenRepository = useGenerateCustomerTokenRepository()

  return async (email: string, password: string, { redirect = true }: Options = {}) => {
    const { token } = await generateCustomerTokenRepository(email, password)

    cookies.set(MAGENTO_CUSTOMER_COOKIE_NAME, token, { path: '/' })

    if (redirect) {
      window.location.href = localePath('index').fullPath
    }
  }
}
