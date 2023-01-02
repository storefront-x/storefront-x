import useCookies from '#ioc/composables/useCookies'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'
import useGetCurrencies from '#ioc/services/useGetCurrencies'
import useMulticurrencyStore from '#ioc/stores/useMulticurrencyStore'
import useStoreStore from '#ioc/stores/useStoreStore'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('multicurrencyMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const cookies = useCookies()
      const storeStore = useStoreStore()
      const multicurrencyStore = useMulticurrencyStore()
      const getCurrencies = useGetCurrencies()

      const code = cookies.get(MULTICURRENCY_COOKIE_NAME)
      const { currencies } = await getCurrencies()

      if (code) {
        storeStore.$patch({ currency: { code } })
      }

      multicurrencyStore.$patch({ currencies })
    },
  },
})
