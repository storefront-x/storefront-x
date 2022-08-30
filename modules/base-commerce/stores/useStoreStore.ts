import { defineStore } from 'pinia'
import useToCurrency from '#ioc/mappers/useToCurrency'

export default defineStore('store', {
  state: () => ({
    currency: null as ReturnType<ReturnType<typeof useToCurrency>> | null,
  }),
})
