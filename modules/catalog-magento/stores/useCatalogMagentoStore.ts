import defineStore from '#ioc/utils/vuePinia/defineStore'
import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useCatalogStore from '#ioc/stores/useCatalogStore'
import useGetNavigationMenu from '#ioc/services/useGetNavigationMenu'
import useGetCatalogUrlSuffixes from '#ioc/repositories/useGetCatalogUrlSuffixes'

export default defineStore('catalogMagento', {
  state: () => ({
    productUrlSuffix: '',
    categoryUrlSuffix: '',
  }),

  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const catalogStore = useCatalogStore()
      const getNavigationMenu = useGetNavigationMenu()
      const getCatalogUrlSuffixes = useGetCatalogUrlSuffixes()

      const [{ categories }, { productUrlSuffix, categoryUrlSuffix }] = await Promise.all([
        getNavigationMenu(),
        getCatalogUrlSuffixes(),
      ])

      this.$patch({ productUrlSuffix, categoryUrlSuffix })
      catalogStore.$patch({ menu: categories })
    },
  },
})
