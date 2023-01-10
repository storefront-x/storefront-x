import CompareList from '#ioc/graphql/queries/CompareList'
import useMagento from '#ioc/composables/useMagento'
import ToCompareItem from '#ioc/mappers/ToCompareItem'
import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'

export default () => {
  const magento = useMagento()

  return async (uid: string) => {
    const { data } = await magento.graphql(CompareList().with({ uid }))

    return {
      attributes: data.compareList.attributes.map(ToCompareAttribute) ?? [],
      items: data.compareList.items.map(ToCompareItem) ?? [],
    }
  }
}
