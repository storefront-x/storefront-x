import { defineStore } from 'pinia'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCatalogStore from '#ioc/stores/useCatalogStore'
import useGetNavigationMenu from '#ioc/services/useGetNavigationMenu'

export default defineStore('catalogShopware', {
  actions: {
    serverInit: async () => {
      if (IS_CLIENT) return

      const catalogStore = useCatalogStore()
      const getNavigationMenu = useGetNavigationMenu()

      const { categories } = await getNavigationMenu()

      catalogStore.menu = categories
    },
  },
})
