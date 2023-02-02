import CompareList from '#ioc/graphql/queries/CompareList'
import useMagento from '#ioc/composables/useMagento'
import ToCompareList from '#ioc/mappers/ToCompareList'

export default () => {
  const magento = useMagento()

  return async (uid: string) => {
    const { data } = await magento.graphql(CompareList().with({ uid }))
    console.log(data)
    return {
      compareList: ToCompareList(data.compareList),
    }
  }
}
