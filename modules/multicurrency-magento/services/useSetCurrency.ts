import useCookies from '#ioc/composables/useCookies'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'
import ToCurrency from '#ioc/mappers/ToCurrency'

export default () => {
  const cookies = useCookies()

  return async (currency: ReturnType<typeof ToCurrency>) => {
    cookies.set(MULTICURRENCY_COOKIE_NAME, currency.code, { path: '/' })

    window.location.reload()
  }
}
