import CreateCompareList from '#ioc/graphql/mutations/CreateCompareList'
import useMagento from '#ioc/composables/useMagento'
import ToCompareList from '#ioc/mappers/ToCompareList'

export default () => {
  const magento = useMagento()

  return async () => {
    const { data } = await magento.graphql(CreateCompareList())

    return {
      compareList: ToCompareList(data.createCompareList),
    }
  }
}
