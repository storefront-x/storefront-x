import useCatalogStore from '#ioc/stores/useCatalogStore'
import useGetNavigationMenu from '#ioc/services/useGetNavigationMenu'
import useGetCatalogUrlSuffixes from '#ioc/repositories/useGetCatalogUrlSuffixes'
import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'

export default async () => {
  const catalogStore = useCatalogStore()
  const catalogMagentoStore = useCatalogMagentoStore()
  const getNavigationMenu = useGetNavigationMenu()
  const getCatalogUrlSuffixes = useGetCatalogUrlSuffixes()

  const [{ categories }, { productUrlSuffix, categoryUrlSuffix }] = await Promise.all([
    getNavigationMenu(),
    getCatalogUrlSuffixes(),
  ])

  catalogMagentoStore.$patch({ productUrlSuffix, categoryUrlSuffix })
  catalogStore.$patch({ menu: categories })
}
