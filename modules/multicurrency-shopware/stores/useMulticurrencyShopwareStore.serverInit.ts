import useGetCurrencies from '#ioc/services/useGetCurrencies'
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'

export default () => {
  const multicurrencyStore = useMulticurrencyStore()
  const getCurrencies = useGetCurrencies()

  return async () => {
    const { currencies } = await getCurrencies()

    multicurrencyStore.$patch({ currencies })
  }
}
