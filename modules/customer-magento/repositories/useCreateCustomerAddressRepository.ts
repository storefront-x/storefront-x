import CreateCustomerAddress from '#ioc/graphql/mutations/CreateCustomerAddress'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (address: any): Promise<void> => {
    const { _error } = await magento.graphql(CreateCustomerAddress().with(address))

    if (_error) {
      throw new Error(_error)
    }
  }
}
