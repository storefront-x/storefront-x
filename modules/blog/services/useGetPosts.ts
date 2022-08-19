import useGetPosts from '#ioc/repositories/useGetPostsRepository'

export default () => {
  const getPosts = useGetPosts()

  return async (...args: Parameters<typeof getPosts>) => {
    return await getPosts(...args)
  }
}
