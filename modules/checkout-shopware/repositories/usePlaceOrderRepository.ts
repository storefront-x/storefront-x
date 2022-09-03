import useShopware from '#ioc/composables/useShopware'
import ToOrder from '#ioc/mappers/ToOrder'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    order: ReturnType<typeof ToOrder>
  }> => {
    const response: any = await shopware.post('/checkout/order')

    return {
      order: ToOrder(response),
    }
  }
}
