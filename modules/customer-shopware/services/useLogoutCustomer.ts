import useCookies from '#ioc/composables/useCookies'
import useLocalePath from '#ioc/composables/useLocalePath'
import SHOPWARE_TOKEN_COOKIE_NAME from '#ioc/config/SHOPWARE_TOKEN_COOKIE_NAME'
import useLogoutCustomerRepository from '#ioc/repositories/useLogoutCustomerRepository'

export default () => {
  const localePath = useLocalePath()
  const cookies = useCookies()
  const logoutCustomerRepository = useLogoutCustomerRepository()

  return async () => {
    const { token } = await logoutCustomerRepository()

    cookies.set(SHOPWARE_TOKEN_COOKIE_NAME, token, { path: '/' })

    window.location.href = localePath('sign-in').fullPath
  }
}
