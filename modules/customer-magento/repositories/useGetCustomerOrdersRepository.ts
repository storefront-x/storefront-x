import CustomerOrders from '#ioc/graphql/queries/CustomerOrders'
import useMagento from '#ioc/composables/useMagento'
import useToOrder from '#ioc/mappers/useToOrder'

export default () => {
  const magento = useMagento()
  const toCustomerOrder = useToOrder()

  return async (): Promise<{
    customerOrders: ReturnType<typeof toCustomerOrder>
  }> => {
    const { data } = await magento.graphql(CustomerOrders())

    return {
      customerOrders: data?.customer?.orders?.items.map(toCustomerOrder) ?? [],
    }
  }
}
