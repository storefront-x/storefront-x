import useGetProductsByIdsRepository from '#ioc/repositories/useGetProductsByIdsRepository'

export default () => {
  const getProductsByIdsRepository = useGetProductsByIdsRepository()

  return async (...args: Parameters<typeof getProductsByIdsRepository>) => {
    return await getProductsByIdsRepository(...args)
  }
}
