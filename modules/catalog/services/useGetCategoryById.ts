import useGetCategoryByIdRepository from '#ioc/repositories/useGetCategoryByIdRepository'

export default () => {
  const getCategoryByIdRepository = useGetCategoryByIdRepository()

  return async (...args: Parameters<typeof getCategoryByIdRepository>) => {
    return await getCategoryByIdRepository(...args)
  }
}
