import useGetProductsBySearchRepository from '#ioc/repositories/useGetProductsBySearchRepository'

export default () => {
  const getProductsBySearchRepository = useGetProductsBySearchRepository()

  return async (...args: Parameters<typeof getProductsBySearchRepository>) => {
    return await getProductsBySearchRepository(...args)
  }
}
