import useShopware from '#ioc/composables/useShopware'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    currentShippingMethod: ReturnType<typeof ToShippingMethod>
  }> => {
    const response: any = await shopware.get('/context')

    return {
      currentShippingMethod: ToShippingMethod(response.shippingMethod),
    }
  }
}
