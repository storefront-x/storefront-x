import BlogPosts from '#ioc/graphql/queries/BlogPosts'
import useMagento from '#ioc/composables/useMagento'
import useToPost from '#ioc/mappers/useToPost'

export default () => {
  const magento = useMagento()
  const toPost = useToPost()

  return async (
    type = 'ALL',
    id?: string,
    page = 1,
  ): Promise<{
    posts: ReturnType<typeof toPost>[]
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
      posts: amBlogPosts.items.map(toPost),
    }
  }
}
