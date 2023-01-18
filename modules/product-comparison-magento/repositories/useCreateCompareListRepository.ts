import CreateCompareList from '#ioc/graphql/mutations/CreateCompareList'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async () => {
    const { data } = await magento.graphql(CreateCompareList())
    return {
      comparisonListId: data.createCompareList?.uid ?? '',
    }
  }
}
