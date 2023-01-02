import IS_CLIENT from '#ioc/config/IS_CLIENT'
import defineStore from '#ioc/utils/vuePinia/defineStore'
import useStoreStore from '#ioc/stores/useStoreStore'
import useGetStoreConfig from '#ioc/services/useGetStoreConfig'

export default defineStore('magentoStore', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const storeStore = useStoreStore()
      const getStoreConfig = useGetStoreConfig()

      if (!storeStore.currency) {
        const { currency } = await getStoreConfig()

        storeStore.$patch({ currency })
      }
    },
  },
})
