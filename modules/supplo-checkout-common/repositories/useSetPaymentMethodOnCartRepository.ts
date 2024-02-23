import useMagento from '#ioc/composables/useMagento'
import SetPaymentMethodOnCart from '#ioc/graphql/mutations/SetPaymentMethodOnCart'
import ToCart from '#ioc/mappers/ToCart'
import ToPaymentMethod from '#ioc/mappers/ToPaymentMethod'

export default () => {
  const magento = useMagento()

  return async (cartId: string, paymentMethod: ReturnType<typeof ToPaymentMethod>) => {
    const { data } = await magento.graphql(SetPaymentMethodOnCart().with({ cartId, ...paymentMethod }))

    return {
      cart: ToCart(data.setPaymentMethodOnCart.cart),
    }
  }
}
