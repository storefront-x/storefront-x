import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { defineStore } from 'pinia'
import useGetStoreConfig from '#ioc/services/useGetStoreConfig'
import useStoreStore from '#ioc/stores/useStoreStore'

export default defineStore('magentoStore', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return
      const storeStore = useStoreStore()
      const getStoreConfig = useGetStoreConfig()

      const { storeConfig } = await getStoreConfig()

      storeStore.$patch({ storeConfig })
    },
  },
})
