import useShopware from '#ioc/composables/useShopware'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

export default () => {
  const shopware = useShopware()
  const toPaymentMethod = useToPaymentMethod()

  return async (
    paymentMethod: ReturnType<typeof toPaymentMethod>,
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
