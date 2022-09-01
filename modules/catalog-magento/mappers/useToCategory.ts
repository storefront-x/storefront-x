import useCatalogMagentoStore from '#ioc/stores/useCatalogMagentoStore'
import MAGENTO_URL from '#ioc/config/MAGENTO_URL'

export default () => {
  const catalogMagentoStore = useCatalogMagentoStore()

  const toCategory = (data: any) => ({
    id: data.id ?? 0,
    urlPath: '/' + data.url_path + catalogMagentoStore.categoryUrlSuffix,
    name: data.name ?? '',
    description: data.description ?? '',
    thumbnailUrl: data.thumbnail ? MAGENTO_URL + '/media/catalog/category/' + data.thumbnail : data.thumbnail,
    breadcrumbs: [],
    productsTotalCount: data.products?.total_count ?? 0,
    children: data.children?.map(toCategory) ?? [],
  })

  return toCategory
}