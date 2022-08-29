import useGetBlogPosts from '#ioc/repositories/useGetBlogPostsRepository'

export default () => {
  const getBlogPosts = useGetBlogPosts()

  return async (...args: Parameters<typeof getBlogPosts>) => {
    return await getBlogPosts(...args)
  }
}
