import CustomerAddresses from '#ioc/graphql/queries/CustomerAddresses'
import useMagento from '#ioc/composables/useMagento'
import useToCustomerAddress from '#ioc/mappers/useToCustomerAddress'

export default () => {
  const magento = useMagento()
  const toCustomerAddress = useToCustomerAddress()

  return async (): Promise<{
    addresses: ReturnType<typeof toCustomerAddress>[]
  }> => {
    const { data } = await magento.graphql(CustomerAddresses())

    return {
      addresses: data?.customer?.addresses?.map(toCustomerAddress) ?? [],
    }
  }
}
