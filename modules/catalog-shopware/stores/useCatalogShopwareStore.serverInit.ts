import useCatalogStore from '#ioc/stores/useCatalogStore'
import useGetNavigationMenu from '#ioc/services/useGetNavigationMenu'

export default () => {
  const catalogStore = useCatalogStore()
  const getNavigationMenu = useGetNavigationMenu()

  return async () => {
    const { categories } = await getNavigationMenu()

    catalogStore.$patch({ menu: categories })
  }
}
