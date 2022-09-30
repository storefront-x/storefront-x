import useGetBlogCategoryByIdRepository from '#ioc/repositories/useGetBlogCategoryByIdRepository'

export default () => {
  const getBlogCategoryByIdRepository = useGetBlogCategoryByIdRepository()

  return async (...args: Parameters<typeof getBlogCategoryByIdRepository>) => {
    return await getBlogCategoryByIdRepository(...args)
  }
}
