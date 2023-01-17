import useGetCurrencies from '#ioc/services/useGetCurrencies'
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'

export default async () => {
  const multicurrencyStore = useMulticurrencyStore()
  const getCurrencies = useGetCurrencies()

  const { currencies } = await getCurrencies()

  multicurrencyStore.$patch({ currencies })
}
