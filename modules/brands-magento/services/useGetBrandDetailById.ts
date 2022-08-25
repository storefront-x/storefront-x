import useGetBrandDetailByIdRepository from '#ioc/repositories/useGetBrandDetailByIdRepository'

export default () => {
  const getBrandDetailByIdRepository = useGetBrandDetailByIdRepository()

  return async (...args: Parameters<typeof getBrandDetailByIdRepository>) => {
    return await getBrandDetailByIdRepository(...args)
  }
}
