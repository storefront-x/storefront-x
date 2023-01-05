import AssignCompareListToCustomer from '#ioc/graphql/mutations/AssignCompareListToCustomer'
import useMagento from '#ioc/composables/useMagento'
import ToCompareItem from '#ioc/mappers/ToCompareItem'
import ToCompareAttribute from '#ioc/mappers/ToCompareAttribute'

export default () => {
  const magento = useMagento()

  return async (uid: string) => {
    const { data } = await magento.graphql(AssignCompareListToCustomer().with({ uid }))

    return {
      uid: data.assignCompareListToCustomer?.compare_list?.uid ?? '',
      attributes: data.assignCompareListToCustomer?.compare_list?.attributes.map(ToCompareAttribute) ?? [],
      items: data.assignCompareListToCustomer?.compare_list?.items.map(ToCompareItem) ?? [],
    }
  }
}
