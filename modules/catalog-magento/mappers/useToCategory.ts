import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import useToSubcategory from '#ioc/mappers/useToSubcategory'

export default () => {
  const catalogMagentoStore = useCatalogMagentoStore()
  const toSubcategory = useToSubcategory()

  return (data: any) => ({
    id: data.id ?? 0,
    urlPath: '/' + data.url_path + catalogMagentoStore.categoryUrlSuffix,
    name: data.name ?? '',
    description: data.description ?? '',
    thumbnailUrl: data.thumbnail ? '/media/catalog/category/' + data.thumbnail : data.thumbnail,
    breadcrumbs: [],
    productsTotalCount: data.products?.total_count ?? 0,
    children: data.children.map(toSubcategory) ?? [],
  })
}
