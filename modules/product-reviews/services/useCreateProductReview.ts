import useCreateProductReviewRepository from '#ioc/repositories/useCreateProductReviewRepository'

export default () => {
  const createProductReviewRepository = useCreateProductReviewRepository()

  return async (...args: Parameters<typeof createProductReviewRepository>) => {
    return await createProductReviewRepository(...args)
  }
}
