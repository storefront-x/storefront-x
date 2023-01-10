import CategoryList from '#ioc/graphql/queries/CategoryList'
import useMagento from '#ioc/composables/useMagento'
import ToCategory from '#ioc/mappers/ToCategory'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    categories: ReturnType<typeof ToCategory>[]
  }> => {
    const {
      data: { categoryList },
    } = await magento.graphql(CategoryList())
    const visibleCategoryList = flatFilter('children', 'include_in_menu', 0, categoryList)

    return {
      categories: visibleCategoryList[0].children.map(ToCategory),
    }
  }
}
function flatFilter(nestedProp: string, compareKey: string, compareId: number, arr: any) {
  return arr.filter((o: any) => {
    const keep = o[compareKey] != compareId
    if (keep && o[nestedProp]) {
      o[nestedProp] = flatFilter(nestedProp, compareKey, compareId, o[nestedProp])
    }
    return keep
  })
}
