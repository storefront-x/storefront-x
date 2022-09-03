import { defineStore } from 'pinia'
import ToFreeShippingConfig from '#ioc/mappers/ToFreeShippingConfig'

export default defineStore('freeShipping', {
  state: () => ({
    freeShippingConfig: null as ReturnType<typeof ToFreeShippingConfig> | null,
  }),
})
