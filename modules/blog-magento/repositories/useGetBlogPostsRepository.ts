import BlogPosts from '#ioc/graphql/queries/BlogPosts'
import useMagento from '#ioc/composables/useMagento'
import ToBlogPost from '#ioc/mappers/ToBlogPost'

export default () => {
  const magento = useMagento()

  return async (
    type = 'ALL',
    id?: string,
    page = 1,
  ): Promise<{
    blogPosts: ReturnType<typeof ToBlogPost>[]
    blogPostsSize: number
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
      blogPosts: amBlogPosts?.items?.map(ToBlogPost) || [],
      blogPostsSize: amBlogPosts.all_post_size,
    }
  }
}
