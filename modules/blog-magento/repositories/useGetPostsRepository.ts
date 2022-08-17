import ProductDetail from '#ioc/graphql/queries/ProductDetail'
import useMagento from '#ioc/composables/useMagento'
import useToPost from '#ioc/mappers/useToPost'

export default () => {
  const magento = useMagento()
  const toPost = useToPost()

  return async (
    id: string,
  ): Promise<{
    posts: ReturnType<typeof toPost>[]
  }> => {
    const {
      data: { posts },
    } = await magento.graphql(
      ProductDetail().with({
        urlKey: id,
      }),
    )

    return {
      posts: posts.map(toPost),
    }
  }
}
