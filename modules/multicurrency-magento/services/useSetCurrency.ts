import useMagentoStore from '#ioc/stores/useMagentoStore'
import useToAvailableCurrencyCode from '#ioc/mappers/useToAvailableCurrencyCode'
import useCookies from '#ioc/composables/useCookies'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'

export default () => {
  const magentoStore = useMagentoStore()
  const cookies = useCookies()

  return async (currencyCode: ReturnType<ReturnType<typeof useToAvailableCurrencyCode>>) => {
    if (currencyCode.code === magentoStore.storeConfig.baseCurrencyCode.code) {
      cookies.remove(MULTICURRENCY_COOKIE_NAME)
    } else {
      cookies.set(MULTICURRENCY_COOKIE_NAME, currencyCode.code)
    }
    window.location.reload()
  }
}
