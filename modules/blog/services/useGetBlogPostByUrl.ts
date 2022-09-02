import useGetBlogPostByUrlRepository from '#ioc/repositories/useGetBlogPostByUrlRepository'

export default () => {
  const getBlogPostByUrlRepository = useGetBlogPostByUrlRepository()

  return async (...args: Parameters<typeof getBlogPostByUrlRepository>) => {
    return await getBlogPostByUrlRepository(...args)
  }
}
