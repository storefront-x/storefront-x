import ToCurrency from '#ioc/mappers/ToCurrency'
import { defineStore } from 'pinia'

export default defineStore('multicurrency', {
  state: () => ({
    currencies: [] as ReturnType<typeof ToCurrency>[],
  }),
})
