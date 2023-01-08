import CategoryList from '#ioc/graphql/queries/CategoryList'
import useMagento from '#ioc/composables/useMagento'
import ToCategory from '#ioc/mappers/ToCategory'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    categories: ReturnType<typeof ToCategory>[]
  }> => {
    const {
      data: { categories },
    } = await magento.graphql(CategoryList())

    return {
      categories: categories.items[0].children.map(ToCategory),
    }
  }
}
