import ToProductReview from '#ioc/mappers/ToProductReview'
import Extension from '#ioc/types/base/Extension'

interface ToProductType {
  reviews: ReturnType<typeof ToProductReview>[]
  reviewCount: number
  ratingSummary: number
}

const ToProduct: Extension<ToProductType> = (ToProduct) => (data) => {
  const self = ToProduct(data)

  self.reviews = data.reviews?.items.map(ToProductReview) ?? []
  self.reviewCount = data.review_count ?? 0
  self.ratingSummary = data.rating_summary ?? 0

  return self
}

export default ToProduct
