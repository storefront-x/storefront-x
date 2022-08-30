import useStoreStore from '#ioc/stores/useStoreStore'
import useCookies from '#ioc/composables/useCookies'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'

export default () => {
  const storeStore = useStoreStore()
  const cookies = useCookies()

  return async (currencyCode: string) => {
    if (currencyCode === storeStore.storeConfig.baseCurrencyCode.code) {
      cookies.remove(MULTICURRENCY_COOKIE_NAME)
    } else {
      cookies.set(MULTICURRENCY_COOKIE_NAME, currencyCode)
    }
    window.location.reload()
  }
}
