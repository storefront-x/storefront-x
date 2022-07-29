import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useGetCurrencies from '#ioc/services/useGetCurrencies'
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import { defineStore } from 'pinia'

export default defineStore('multicurrencyShopware', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const multicurrencyStore = useMulticurrencyStore()
      const getCurrencies = useGetCurrencies()

      const { currencies } = await getCurrencies()

      multicurrencyStore.$patch({ currencies })
    },
  },
})
