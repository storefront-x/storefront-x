import useToCurrency from '#ioc/mappers/useToCurrency'
import { defineStore } from 'pinia'

export default defineStore('multicurrency', {
  state: () => ({
    currencies: [] as ReturnType<ReturnType<typeof useToCurrency>>[],
  }),
})
