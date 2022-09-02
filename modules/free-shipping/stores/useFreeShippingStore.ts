import { defineStore } from 'pinia'
import useToFreeShippingConfig from '#ioc/mappers/useToFreeShippingConfig'

export default defineStore('freeShipping', {
  state: () => ({
    freeShippingConfig: null as ReturnType<ReturnType<typeof useToFreeShippingConfig>> | null,
  }),
})
