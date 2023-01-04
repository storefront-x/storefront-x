import ToCurrency from '#ioc/mappers/ToCurrency'
import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('multicurrency', {
  state: () => ({
    currencies: [] as ReturnType<typeof ToCurrency>[],
  }),
})
