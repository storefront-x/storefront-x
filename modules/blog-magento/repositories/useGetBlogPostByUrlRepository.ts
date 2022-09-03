import BlogPost from '#ioc/graphql/queries/BlogPost'
import useMagento from '#ioc/composables/useMagento'
import ToBlogPost from '#ioc/mappers/ToBlogPost'

export default () => {
  const magento = useMagento()
  return async (
    urlKey: string,
  ): Promise<{
    blogPost: ReturnType<typeof ToBlogPost>
  }> => {
    const {
      data: { amBlogPost },
    } = await magento.graphql(
      BlogPost().with({
        urlKey,
      }),
    )

    return {
      blogPost: ToBlogPost(amBlogPost),
    }
  }
}
