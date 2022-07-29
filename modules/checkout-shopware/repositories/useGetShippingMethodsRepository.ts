import useShopware from '#ioc/composables/useShopware'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

export default () => {
  const shopware = useShopware()
  const toShippingMethod = useToShippingMethod()

  return async (): Promise<{
    shippingMethods: ReturnType<typeof toShippingMethod>[]
  }> => {
    const response: any = await shopware.get('/shipping-method')

    return {
      shippingMethods: response.elements.map(toShippingMethod),
    }
  }
}
