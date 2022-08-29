import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useToCurrency from '#ioc/mappers/useToCurrency'
import useGetCurrencies from '#ioc/services/useGetCurrencies'
import { defineStore } from 'pinia'
import useCookies from '#ioc/composables/useCookies'
import MULTICURRENCY_COOKIE_NAME from '#ioc/config/MULTICURRENCY_COOKIE_NAME'

export default defineStore('multicurrencyMagento', {
  state: () => ({
    currencies: {} as ReturnType<ReturnType<typeof useToCurrency>>,
    selectedCurrencyCode: {
      code: '',
    },
  }),
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const getCurrencies = useGetCurrencies()
      const cookies = useCookies()

      const { currencies } = await getCurrencies()

      this.$patch({ currencies: currencies })

      const selectedCurrencyCode = cookies.get(MULTICURRENCY_COOKIE_NAME)
      if (selectedCurrencyCode) {
        this.$patch({ selectedCurrencyCode: { code: selectedCurrencyCode } })
      }
    },
  },
})
