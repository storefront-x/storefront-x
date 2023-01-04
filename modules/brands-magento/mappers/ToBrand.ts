import ToMagentoImage from '#ioc/mappers/ToMagentoImage'

export default (data: any) => ({
  id: data.brandId ?? 0,
  name: data.label ?? '',
  urlKey: data.url ?? '',
  description: data.description ?? '',
  image: ToMagentoImage(data.image ?? ''),
})
