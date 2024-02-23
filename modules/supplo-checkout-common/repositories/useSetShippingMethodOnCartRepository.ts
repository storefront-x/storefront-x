import useMagento from '#ioc/composables/useMagento'
import SetShippingMethodOncart from '#ioc/graphql/mutations/SetShippingMethodOnCart'
import ToCart from '#ioc/mappers/ToCart'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'

export default () => {
  const magento = useMagento()

  return async (cartId: string, shippingMethod: ReturnType<typeof ToShippingMethod>) => {
    const { data } = await magento.graphql(SetShippingMethodOncart().with({ cartId, ...shippingMethod }))

    return {
      cart: ToCart(data.setShippingMethodOnCart.cart),
    }
  }
}
