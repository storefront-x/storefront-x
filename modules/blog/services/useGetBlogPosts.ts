import useGetBlogPosts from '#ioc/repositories/useGetPostsRepository'

export default () => {
  const getBlogPosts = useGetBlogPosts()

  return async (...args: Parameters<typeof getBlogPosts>) => {
    return await getBlogPosts(...args)
  }
}
