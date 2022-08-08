import { defineStore } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCatalogStore from '#ioc/stores/useCatalogStore'
import useGetCategoryList from '#ioc/services/useGetCategoryList'

export default defineStore('catalog-magento', {
  actions: {
    serverInit: async () => {
      if (IS_CLIENT) return

      const catalogStore = useCatalogStore()
      const getCategoryList = useGetCategoryList()

      const { categories } = await getCategoryList()

      catalogStore.menu = categories
    },
  },
})
