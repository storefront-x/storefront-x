import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useGetCurrencies from '#ioc/services/useGetCurrencies'
import { defineStore } from 'pinia'
import useCookies from '#ioc/composables/useCookies'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import useStoreStore from '#ioc/stores/useStoreStore'

export default defineStore('multicurrencyMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const storeStore = useStoreStore()
      const multicurrencyStore = useMulticurrencyStore()
      const getCurrencies = useGetCurrencies()
      const cookies = useCookies()

      const { currency } = await getCurrencies()
      const currenciesArray = []
      currenciesArray.push(currency)

      multicurrencyStore.$patch({ currencies: currenciesArray })

      const selectedCurrencyCode = cookies.get(MULTICURRENCY_COOKIE_NAME)
      if (selectedCurrencyCode) {
        storeStore.$patch({ selectedCurrencyCode })
      }
    },
  },
})
