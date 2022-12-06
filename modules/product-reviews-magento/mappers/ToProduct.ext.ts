import ToProductReview from '#ioc/mappers/ToProductReview'
import Extension from '#ioc/types/base/Extension'

interface ToProductType {
  reviews: ReturnType<typeof ToProductReview>[]
  reviewCount: number
  ratingSummary: number
}

const ToProduct: Extension<ToProductType> = (ToProduct) => (data) => ({
  ...ToProduct(data),
  reviews: data.reviews?.items.map(ToProductReview) ?? [],
  reviewCount: data.review_count ?? 0,
  ratingSummary: data.rating_summary ?? 0,
})

export default ToProduct
