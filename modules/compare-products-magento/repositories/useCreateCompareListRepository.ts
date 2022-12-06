import CreateCompareList from '#ioc/graphql/mutations/CreateCompareList'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async () => {
    const { data } = await magento.graphql(CreateCompareList())
    console.log('these are data from create compare list', data)
    return {
      id: data.CreateCompareList?.uid ?? 0,
    }
  }
}
