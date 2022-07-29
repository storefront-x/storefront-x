import useGetProductByIdRepository from '#ioc/repositories/useGetProductByIdRepository'

export default () => {
  const getProductByIdRepository = useGetProductByIdRepository()

  return async (...args: Parameters<typeof getProductByIdRepository>) => {
    return await getProductByIdRepository(...args)
  }
}
