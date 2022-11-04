import useMagento from '#ioc/composables/useMagento'
import SetShippingMethodOncart from '#ioc/graphql/mutations/SetShippingMethodOnCart'
import ToCheckout from '#ioc/mappers/ToCheckout'
import ToShippingMethod from '#ioc/mappers/ToShippingMethod'

export default () => {
  const magento = useMagento()

  return async (cartId: string, shippingMethod: ReturnType<typeof ToShippingMethod>) => {
    const { data } = await magento.graphql(SetShippingMethodOncart().with({ cartId, ...shippingMethod }))

    return {
      checkout: ToCheckout(data.setShippingMethodOnCart.cart),
    }
  }
}
