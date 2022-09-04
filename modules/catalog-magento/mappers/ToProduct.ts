import ToMoney from '#ioc/mappers/ToMoney'
import ToProductReview from '#ioc/mappers/ToProductReview'

const ToProduct = (data: any) => ({
  __typename: data.__typename ?? '',
  id: (data.id ?? 0) as number,
  sku: (data.sku ?? '') as string,
  name: (data.name ?? '') as string,
  categories: data.categories ?? [],
  urlKey: (data.url_key ?? '') as string,
  thumbnailUrl: (data.thumbnail?.url ?? '') as string,
  descriptionHtml: (data.description?.html ?? '') as string,
  shortDescriptionHtml: (data.short_description?.html ?? '') as string,
  finalPrice: ToMoney(data.price_range?.minimum_price?.final_price),
  regularPrice: ToMoney(data.price_range?.minimum_price?.regular_price),
  breadcrumbs: [],
  available: (data.stock_status === 'IN_STOCK' ?? false) as boolean,
  meta: {
    description: data.description?.html ?? '',
  },
  images: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
  ratingSummary: data.rating_summary ?? 0,
  reviewCount: data.review_count ?? 0,
  reviews: data.reviews?.items.map(ToProductReview) ?? [],
  mediaGallery: (data.media_gallery ?? []).filter((item: any) => !item.disabled),
})

export default (data: any) => ({
  ...ToProduct(data),
  crossSellProducts: ((data.related_products ?? []) as any[]).map(ToProduct),
  upsellProducts: ((data.upsell_products ?? []) as any[]).map(ToProduct),
})
