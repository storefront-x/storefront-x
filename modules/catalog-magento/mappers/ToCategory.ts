import ToCategory from '#ioc/mappers/ToCategory'

export default (data: any) => ({
  id: data.id ?? 0,
  urlKey: data.url_path,
  name: data.name ?? '',
  description: data.description ?? '',
  meta: {
    title: data.meta_title ?? '',
    description: data.meta_description ?? '',
    keywords: data.meta_keywords ?? '',
  },
  imageUrl: data.image,
  breadcrumbs: data.breadcrumbs?.map(toBreadcrumbs) || [],
  productsTotalCount: data.products?.total_count ?? 0,
  children: (data.children ?? []).map(ToCategory),
})

const toBreadcrumbs = (data: any) => ({
  title: data.category_name ?? '',
  link: '/' + data.category_url_path ?? '',
})
