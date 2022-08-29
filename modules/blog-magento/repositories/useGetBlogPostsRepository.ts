import BlogPosts from '#ioc/graphql/queries/BlogPosts'
import useMagento from '#ioc/composables/useMagento'
import useToBlogPost from '#ioc/mappers/useToBlogPost'

export default () => {
  const magento = useMagento()
  const toBlogPost = useToBlogPost()

  return async (
    type = 'ALL',
    id?: string,
    page = 1,
  ): Promise<{
    posts: ReturnType<typeof toBlogPost>[]
  }> => {
    const {
      data: { amBlogPosts },
    } = await magento.graphql(
      BlogPosts().with({
        type,
        id,
        page,
      }),
    )

    return {
      blogPosts: amBlogPosts.items.map(toBlogPost),
      blogPostsSize: amBlogPosts.all_post_size,
    }
  }
}
