import useShopware from '#ioc/composables/useShopware'
import useToOrder from '#ioc/mappers/useToOrder'

export default () => {
  const shopware = useShopware()
  const toOrder = useToOrder()

  return async (): Promise<{
    customerOrders: ReturnType<typeof toOrder>[]
  }> => {
    const response = await shopware.post(`/order`)

    return {
      customerOrders: response?.orders?.elements?.map(toOrder) ?? [],
    }
  }
}
