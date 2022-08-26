import CustomerOrders from '#ioc/graphql/queries/CustomerOrders'
import useMagento from '#ioc/composables/useMagento'
import useToCustomerOrder from '#ioc/mappers/useToCustomerOrder'

export default () => {
  const magento = useMagento()
  const toCustomerOrder = useToCustomerOrder()

  return async (): Promise<{
    customerOrders: ReturnType<typeof toCustomerOrder>
  }> => {
    const { data } = await magento.graphql(CustomerOrders())

    return {
      customerOrders: data?.customer?.orders?.items.map(toCustomerOrder) ?? [],
    }
  }
}
