import useMagento from '#ioc/composables/useMagento'
import GetPaymentMethods from '#ioc/graphql/queries/GetPaymentMethods'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

export default () => {
  const magento = useMagento()
  const toPaymentMethod = useToPaymentMethod()

  return async (
    cartId: string,
  ): Promise<{
    paymentMethods: ReturnType<typeof toPaymentMethod>[]
  }> => {
    const { data } = await magento.graphql(GetPaymentMethods().with({ cartId }))

    return {
      paymentMethods: ((data.cart.available_payment_methods as any[]) ?? []).map(toPaymentMethod),
    }
  }
}
