import useMagento from '#ioc/composables/useMagento'
import SetPaymentMethodOnCart from '#ioc/graphql/mutations/SetPaymentMethodOnCart'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

export default () => {
  const magento = useMagento()
  const toPaymentMethod = useToPaymentMethod()

  return async (
    cartId: string,
    paymentMethod: ReturnType<typeof toPaymentMethod>,
  ): Promise<{
    paymentMethods: ReturnType<typeof toPaymentMethod>[]
  }> => {
    const { data } = await magento.graphql(SetPaymentMethodOnCart().with({ cartId, code: paymentMethod.code }))

    return {
      paymentMethods: (data.setPaymentMethodOnCart.cart.available_payment_methods as any[]).map(toPaymentMethod),
    }
  }
}
