import IS_CLIENT from '#ioc/config/IS_CLIENT'
import { defineStore } from 'pinia'
import useToStoreConfig from '#ioc/mappers/useToStoreConfig'
import useGetStoreConfig from '#ioc/services/useGetStoreConfig'

export default defineStore('magentoStore', {
  state: () => ({
    storeConfig: {} as ReturnType<ReturnType<typeof useToStoreConfig>>,
  }),
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const getStoreConfig = useGetStoreConfig()

      const { storeConfig } = await getStoreConfig()

      this.$patch({ storeConfig })
    },
  },
})
