import defineStore from '#ioc/utils/vuePinia/defineStore'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useGetFreeShippingConfig from '#ioc/services/useGetFreeShippingConfig'
import useFreeShippingStore from '#ioc/stores/useFreeShippingStore'

export default defineStore('freeShippingMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const freeShippingStore = useFreeShippingStore()

      const getFreeShippingConfig = useGetFreeShippingConfig()

      const freeShippingConfig = await getFreeShippingConfig()

      freeShippingStore.$patch(freeShippingConfig)
    },
  },
})
