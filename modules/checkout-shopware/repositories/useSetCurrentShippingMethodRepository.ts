import useShopware from '#ioc/composables/useShopware'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

export default () => {
  const shopware = useShopware()
  const toShippingMethod = useToShippingMethod()

  return async (
    shippingMethod: ReturnType<typeof toShippingMethod>,
  ): Promise<{
    token: string
  }> => {
    const response = await shopware.patch('/context', {
      shippingMethodId: shippingMethod.id,
    })

    return {
      token: response.contextToken,
    }
  }
}
