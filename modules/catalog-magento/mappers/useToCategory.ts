import useToCategoryBreadcrumb from '#ioc/mappers/useToCategoryBreadcrumb'

export default () => {
  const ToCategoryBreadcrumb = useToCategoryBreadcrumb()
  return (data: any) => ({
    id: data.id ?? 0,
    name: data.name ?? '',
    description: data.description ?? '',
    urlPath: `/c/${data.id}`, // TODO: Make '.html' suffix configurable
    breadcrumbs: data.breadcrumbs?.map(ToCategoryBreadcrumb) ?? [],
    metaTitle: data.meta_title ?? '',
    metaDescription: data.meta_description ?? '',
    metaKeywords: data.meta_keywords ?? '',
    image: data.image,
    productsTotalCount: data.products?.total_count ?? 0,
    thumbnail: data.thumbnail ? '/media/catalog/category/' + data.thumbnail : data.thumbnail,
  })
}
