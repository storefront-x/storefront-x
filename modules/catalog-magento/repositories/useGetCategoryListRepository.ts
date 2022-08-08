import CategoryList from '#ioc/graphql/queries/CategoryList'
import useMagento from '#ioc/composables/useMagento'
import useToCategory from '#ioc/mappers/useToCategory'

export default () => {
  const magento = useMagento()
  const toCategory = useToCategory()

  return async (): Promise<{
    categories: ReturnType<typeof toCategory>[]
  }> => {
    const { categoryList } = await magento.graphql(CategoryList())

    return {
      categories: categoryList[0].children.map(toCategory),
    }
  }
}
