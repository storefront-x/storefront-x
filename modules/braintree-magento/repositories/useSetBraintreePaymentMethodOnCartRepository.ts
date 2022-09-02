import useMagento from '#ioc/composables/useMagento'
import SetBraintreePaymentMethodOnCart from '#ioc/graphql/mutations/SetBraintreePaymentMethodOnCart'
import useToCheckout from '#ioc/mappers/useToCheckout'
import useToPaymentMethod from '#ioc/mappers/useToPaymentMethod'

interface Options {
  nonce: string
}

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string, paymentMethod: ReturnType<ReturnType<typeof useToPaymentMethod>>, options: Options) => {
    const { data } = await magento.graphql(
      SetBraintreePaymentMethodOnCart().with({ cartId, code: paymentMethod.code, nonce: options.nonce }),
    )

    return {
      checkout: toCheckout(data.setPaymentMethodOnCart.cart),
    }
  }
}
