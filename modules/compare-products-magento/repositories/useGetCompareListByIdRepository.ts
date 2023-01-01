import CompareList from '#ioc/graphql/queries/CompareList'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (uid: string) => {
    const { data } = await magento.graphql(CompareList().with({ uid }))

    return {
      id: data.uid ?? 0,
      items: data.items,
    }
  }
}
