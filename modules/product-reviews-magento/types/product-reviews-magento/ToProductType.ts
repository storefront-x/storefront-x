import ToProductReview from '#ioc/mappers/ToProductReview'

export default interface ToProductType {
  reviews: ReturnType<typeof ToProductReview>[]
  reviewCount: number
  ratingSummary: number
}
