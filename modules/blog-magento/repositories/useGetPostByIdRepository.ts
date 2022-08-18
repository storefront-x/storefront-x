import BlogPost from '#ioc/graphql/queries/BlogPost'
import useMagento from '#ioc/composables/useMagento'
import useToPost from '#ioc/mappers/useToPost'

export default () => {
  const magento = useMagento()
  const toPost = useToPost()

  return async (
    id: string,
  ): Promise<{
    post: ReturnType<typeof toPost>
  }> => {
    const {
      data: { posts },
    } = await magento.graphql(
      BlogPost().with({
        urlKey: id,
      }),
    )

    return {
      post: toPost(posts.items.find((item: any) => item.url_key === id)),
    }
  }
}
