import useShopware from '#ioc/composables/useShopware'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    shippingMethods: ReturnType<typeof ToShippingMethod>[]
  }> => {
    const response: any = await shopware.get('/shipping-method')

    return {
      shippingMethods: response.elements.map(ToShippingMethod),
    }
  }
}
