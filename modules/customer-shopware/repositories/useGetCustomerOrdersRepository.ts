import useShopware from '#ioc/composables/useShopware'
import ToOrder from '#ioc/mappers/ToOrder'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    customerOrders: ReturnType<typeof ToOrder>[]
  }> => {
    const response = await shopware.post(`/order`)

    return {
      customerOrders: response?.orders?.elements?.map(ToOrder) ?? [],
    }
  }
}
