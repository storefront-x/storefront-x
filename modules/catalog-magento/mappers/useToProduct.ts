import useToCategory from '#ioc/mappers/useToCategory'
import useToMoney from '#ioc/mappers/useToMoney'

export default () => {
  const toMoney = useToMoney()
  const toCategory = useToCategory()

  return (data: any) => ({
    __typename: data.__typename ?? '',
    id: data.id ?? 0,
    sku: data.sku ?? '',
    name: data.name ?? '',
    urlKey: data.url_key ?? '',
    urlPath: `/p/${data.url_key}`,
    categories: data.categories.map(toCategory) ?? [],
    thumbnailUrl: data.thumbnail?.url ?? '',
    minimumPrice: toMoney(data.price_range?.minimum_price?.final_price) ?? 0,
    finalPrice: toMoney(data.price_range?.minimum_price?.final_price) ?? 0,
    regularPrice: toMoney(data.price_range?.minimum_price?.regular_price) ?? 0,
    currency: data.price_range?.minimum_price?.final_price?.currency,
    description: data.description?.html ?? '',
    shortDescriptionHtml: data.short_description?.html ?? '',
    mediaGallery: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
    metaTitle: data.meta_title ?? '',
    metaDescription: data.meta_description ?? '',
    metaKeywords: data.meta_keyword ?? '',
    available: data.stock_status ?? '',
    onlyXLeftInStock: data.only_x_left_in_stock ?? null,
    ratingSummary: data.rating_summary ?? 0,
  })
}
