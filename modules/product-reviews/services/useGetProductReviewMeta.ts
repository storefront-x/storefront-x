import useGetProductReviewMetaRepository from '#ioc/repositories/useGetProductReviewMetaRepository'

export default () => {
  const getProductReviewMetaRepository = useGetProductReviewMetaRepository()

  return async (...args: Parameters<typeof getProductReviewMetaRepository>) => {
    return await getProductReviewMetaRepository(...args)
  }
}
