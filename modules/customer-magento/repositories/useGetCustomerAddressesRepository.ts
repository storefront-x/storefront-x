import CustomerAddresses from '#ioc/graphql/queries/CustomerAddresses'
import useMagento from '#ioc/composables/useMagento'
import ToCustomerAddress from '#ioc/mappers/ToCustomerAddress'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    addresses: ReturnType<typeof ToCustomerAddress>[]
  }> => {
    const { data } = await magento.graphql(CustomerAddresses())

    return {
      addresses: data?.customer?.addresses?.map(ToCustomerAddress) ?? [],
    }
  }
}
