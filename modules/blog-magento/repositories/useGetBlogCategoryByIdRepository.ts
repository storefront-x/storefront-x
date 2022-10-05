import BlogCategory from '#ioc/graphql/queries/BlogCategory'
import useMagento from '#ioc/composables/useMagento'
import ToBlogCategory from '#ioc/mappers/ToBlogCategory'

export default () => {
  const magento = useMagento()
  return async (
    id: string,
  ): Promise<{
    blogCategory: ReturnType<typeof ToBlogCategory>
  }> => {
    const {
      data: { amBlogCategory },
    } = await magento.graphql(
      BlogCategory().with({
        id,
      }),
    )

    return {
      blogCategory: ToBlogCategory(amBlogCategory),
    }
  }
}
