import useShopware from '#ioc/composables/useShopware'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

export default () => {
  const shopware = useShopware()
  const toShippingMethod = useToShippingMethod()

  return async (): Promise<{
    currentShippingMethod: ReturnType<typeof toShippingMethod>
  }> => {
    const response: any = await shopware.get('/context')

    return {
      currentShippingMethod: toShippingMethod(response.shippingMethod),
    }
  }
}
