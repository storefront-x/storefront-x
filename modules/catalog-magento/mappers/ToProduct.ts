import ToMoney from '#ioc/mappers/ToMoney'
import ToProductReview from '#ioc/mappers/ToProductReview'

const ToProduct = (data: any) => ({
  __typename: data.__typename ?? '',
  id: data.id ?? 0,
  sku: data.sku ?? '',
  name: data.name ?? '',
  categories: data.categories ?? [],
  urlKey: data.url_key ?? '',
  thumbnailUrl: data.thumbnail?.url ?? '',
  descriptionHtml: data.description?.html ?? '',
  shortDescriptionHtml: data.short_description?.html ?? '',
  finalPrice: ToMoney(data.price_range?.minimum_price?.final_price) ?? 0,
  regularPrice: ToMoney(data.price_range?.minimum_price?.regular_price) ?? 0,
  breadcrumbs: [],
  available: data.stock_status === 'IN_STOCK' ?? false,
  meta: {
    description: data.description?.html ?? '',
  },
  images: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  ratingSummary: data.rating_summary ?? 0,
  reviewCount: data.review_count ?? 0,
  reviews: data.reviews?.items.map(ToProductReview) ?? [],
  mediaGallery: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  crossSellProducts: ((data?.related_products ?? []) as any[]).map(ToProduct),
  upsellProducts: ((data?.upsell_products ?? []) as any[]).map(ToProduct),
})

export default ToProduct
