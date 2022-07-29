import useShopware from '#ioc/composables/useShopware'
import useToOrder from '#ioc/mappers/useToOrder'

export default () => {
  const shopware = useShopware()
  const toOrder = useToOrder()

  return async (): Promise<{
    order: ReturnType<typeof toOrder>
  }> => {
    const response: any = await shopware.post('/checkout/order')

    return {
      order: toOrder(response),
    }
  }
}
