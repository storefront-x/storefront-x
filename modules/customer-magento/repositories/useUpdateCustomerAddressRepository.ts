import UpdateCustomerAddress from '#ioc/graphql/mutations/UpdateCustomerAddress'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (address: any): Promise<void> => {
    const { _error } = await magento.graphql(UpdateCustomerAddress().with({ ...address }))

    if (_error) {
      throw new Error(_error)
    }
  }
}
