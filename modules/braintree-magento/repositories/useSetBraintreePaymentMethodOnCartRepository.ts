import useMagento from '#ioc/composables/useMagento'
import SetBraintreePaymentMethodOnCart from '#ioc/graphql/mutations/SetBraintreePaymentMethodOnCart'
import ToCheckout from '#ioc/mappers/ToCheckout'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'

interface Options {
  nonce: string
}

export default () => {
  const magento = useMagento()

  return async (cartId: string, paymentMethod: ReturnType<typeof ToPaymentMethod>, options: Options) => {
    const { data } = await magento.graphql(
      SetBraintreePaymentMethodOnCart().with({ cartId, code: paymentMethod.code, nonce: options.nonce }),
    )

    return {
      checkout: ToCheckout(data.setPaymentMethodOnCart.cart),
    }
  }
}
