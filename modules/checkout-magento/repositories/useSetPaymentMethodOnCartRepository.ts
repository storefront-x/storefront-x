import useMagento from '#ioc/composables/useMagento'
import SetPaymentMethodOnCart from '#ioc/graphql/mutations/SetPaymentMethodOnCart'
import useToCheckout from '#ioc/mappers/useToCheckout'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string, paymentMethod: ReturnType<ReturnType<typeof useToPaymentMethod>>) => {
    const { data } = await magento.graphql(SetPaymentMethodOnCart().with({ cartId, ...paymentMethod }))

    return toCheckout(data.setPaymentMethodOnCart)
  }
}
