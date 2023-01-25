import ToCategoryElastic from '#ioc/mappers/ToCategoryElastic'
import ToMagentoImage from '#ioc/mappers/ToMagentoImage'

export default (data: any) => ({
  id: data.id ?? 0,
  urlKey: data.url_path,
  name: data.name ?? '',
  description: data.description ?? '',
  meta: {
    title: data.meta_title ?? data.name,
    description: data.meta_description ?? '',
    keywords: data.meta_keywords ?? '',
  },
  imageUrl: ToMagentoImage(data.image.startsWith('/') ? data.image : '/media/catalog/category/' + data.image) as string,
  thumbnailUrl: ToMagentoImage(
    data.image.startsWith('/') ? data.image : '/media/catalog/category/' + data.image,
  ) as string,
  breadcrumbs: [],
  productsTotalCount: data.products?.total_count ?? 0,
  children: (data.children_data ?? []).map(ToCategoryElastic),
})
