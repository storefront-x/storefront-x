import defineStore from '#ioc/utils/vuePinia/defineStore'
import ToFreeShippingConfig from '#ioc/mappers/ToFreeShippingConfig'

export default defineStore('freeShipping', {
  state: () => ({
    freeShippingConfig: null as ReturnType<typeof ToFreeShippingConfig> | null,
  }),
})
