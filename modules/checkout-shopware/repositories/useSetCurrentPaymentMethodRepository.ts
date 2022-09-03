import useShopware from '#ioc/composables/useShopware'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'

export default () => {
  const shopware = useShopware()

  return async (
    paymentMethod: ReturnType<typeof ToPaymentMethod>,
  ): Promise<{
    token: string
  }> => {
    const response = await shopware.patch('/context', {
      paymentMethodId: paymentMethod.id,
    })

    return {
      token: response.contextToken,
    }
  }
}
