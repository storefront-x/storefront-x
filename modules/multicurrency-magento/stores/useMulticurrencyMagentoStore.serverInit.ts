import useCookies from '#ioc/composables/useCookies'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'
import useGetCurrencies from '#ioc/services/useGetCurrencies'
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import useStoreStore from '#ioc/stores/useStoreStore'

export default () => {
  const cookies = useCookies()
  const storeStore = useStoreStore()
  const multicurrencyStore = useMulticurrencyStore()
  const getCurrencies = useGetCurrencies()

  return async () => {
    const code = cookies.get(MULTICURRENCY_COOKIE_NAME)
    const { currencies } = await getCurrencies()

    if (code) {
      storeStore.$patch({ currency: { code } })
    }

    multicurrencyStore.$patch({ currencies })
  }
}
