import useGetCategoryListRepository from '#ioc/repositories/useGetCategoryListRepository'

export default () => {
  const getCategoryListRepository = useGetCategoryListRepository()

  return async (...args: Parameters<typeof getCategoryListRepository>) => {
    return await getCategoryListRepository(...args)
  }
}
