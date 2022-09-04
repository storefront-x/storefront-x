import ToProductReview from '#ioc/mappers/ToProductReview'

interface Extension<Ext = Record<string, never>> {
  <T extends (...arg: any) => any>(useProduct: T): (...arg: any) => ReturnType<T> & Ext
}

interface ToProduct {
  reviews: ReturnType<typeof ToProductReview>[]
  reviewCount: number
  ratingSummary: number
}

const ToProduct: Extension<ToProduct> = (ToProduct) => (data) => ({
  ...ToProduct(data),
  reviews: data.reviews?.items.map(ToProductReview) ?? [],
  reviewCount: data.review_count ?? 0,
  ratingSummary: data.rating_summary ?? 0,
})

export default ToProduct
