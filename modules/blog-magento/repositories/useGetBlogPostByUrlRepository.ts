import BlogPost from '#ioc/graphql/queries/BlogPost'
import useMagento from '#ioc/composables/useMagento'
import useToBlogPost from '#ioc/mappers/useToBlogPost'

export default () => {
  const magento = useMagento()
  const toBlogPost = useToBlogPost()

  return async (
    urlKey: string,
  ): Promise<{
    blogPost: ReturnType<typeof toBlogPost>
  }> => {
    const {
      data: { amBlogPost },
    } = await magento.graphql(
      BlogPost().with({
        urlKey,
      }),
    )

    return {
      blogPost: toBlogPost(amBlogPost),
    }
  }
}
