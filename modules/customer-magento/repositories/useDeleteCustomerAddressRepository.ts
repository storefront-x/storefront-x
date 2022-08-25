import DeleteCustomerAddress from '#ioc/graphql/mutations/DeleteCustomerAddress'
import useMagento from '#ioc/composables/useMagento'

export default () => {
  const magento = useMagento()

  return async (id: string): Promise<void> => {
    const { _error } = await magento.graphql(DeleteCustomerAddress().with({ id }))

    if (_error) {
      throw new Error(_error)
    }
  }
}
