import useToMoney from '#ioc/mappers/useToMoney'
import useToProductReview from '#ioc/mappers/useToProductReview'

export default () => {
  const toMoney = useToMoney()
  const toProductReview = useToProductReview()

  return (data: any) => ({
    __typename: data.__typename ?? '',
    id: data.id ?? 0,
    sku: data.sku ?? '',
    name: data.name ?? '',
    urlKey: data.url_key ?? '',
    thumbnailUrl: data.thumbnail?.url ?? '',
    description: data.description?.html ?? '',
    shortDescriptionHtml: data.short_description?.html ?? '',
    finalPrice: toMoney(data.price_range?.minimum_price?.final_price) ?? 0,
    regularPrice: toMoney(data.price_range?.minimum_price?.regular_price) ?? 0,
    breadcrumbs: [],
    available: data.stock_status === 'IN_STOCK' ?? false,
    meta: {
      description: data.description?.html ?? '',
    },
    images: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
    ratingSummary: data.rating_summary ?? 0,
    reviewCount: data.review_count ?? 0,
    reviews: data.reviews?.items.map(toProductReview) ?? [],
    mediaGallery: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  })
}
