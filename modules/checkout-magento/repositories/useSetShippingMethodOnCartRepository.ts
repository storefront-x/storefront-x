import useMagento from '#ioc/composables/useMagento'
import SetShippingMethodOncart from '#ioc/graphql/mutations/SetShippingMethodOncart'
import useToCheckout from '#ioc/mappers/useToCheckout'
import useToShippingMethod from '#ioc/mappers/useToShippingMethod'

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string, shippingMethod: ReturnType<ReturnType<typeof useToShippingMethod>>) => {
    const { data } = await magento.graphql(SetShippingMethodOncart().with({ cartId, ...shippingMethod }))

    return {
      checkout: toCheckout(data.setShippingMethodOnCart.cart),
    }
  }
}
