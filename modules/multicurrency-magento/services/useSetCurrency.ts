import useCookies from '#ioc/composables/useCookies'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default () => {
  const cookies = useCookies()

  return async (currency: ReturnType<ReturnType<typeof useToCurrency>>) => {
    cookies.set(MULTICURRENCY_COOKIE_NAME, currency.code)

    window.location.reload()
  }
}
