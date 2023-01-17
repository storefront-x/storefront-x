import useCatalogStore from '#ioc/stores/useCatalogStore'
import useGetNavigationMenu from '#ioc/services/useGetNavigationMenu'

export default async () => {
  const catalogStore = useCatalogStore()
  const getNavigationMenu = useGetNavigationMenu()

  const { categories } = await getNavigationMenu()

  catalogStore.$patch({ menu: categories })
}
