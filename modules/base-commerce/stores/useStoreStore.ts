import { defineStore } from 'pinia'
import ToCurrency from '#ioc/mappers/ToCurrency'

export default defineStore('store', {
  state: () => ({
    currency: null as ReturnType<typeof ToCurrency> | null,
  }),
})
