import useShopware from '#ioc/composables/useShopware'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'

export default () => {
  const shopware = useShopware()

  return async (
    shippingMethod: ReturnType<typeof ToShippingMethod>,
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
