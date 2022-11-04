import CustomerOrders from '#ioc/graphql/queries/CustomerOrders'
import useMagento from '#ioc/composables/useMagento'
import ToCustomerOrder from '#ioc/mappers/ToCustomerOrder'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    customerOrders: ReturnType<typeof ToCustomerOrder>[]
  }> => {
    const { data } = await magento.graphql(CustomerOrders())

    return {
      customerOrders: data.customer?.orders?.items?.map(ToCustomerOrder) ?? [],
    }
  }
}
