import useMagento from '#ioc/composables/useMagento'
import SetShippingAddressOnCart from '#ioc/graphql/mutations/SetShippingAddressOnCart'
import useToCheckout from '#ioc/mappers/useToCheckout'

export default () => {
  const magento = useMagento()
  const toCheckout = useToCheckout()

  return async (cartId: string, { address, pickupLocationCode }: any) => {
    const { data } = await magento.graphql(
      SetShippingAddressOnCart().with({
        cartId,
        address,
        pickupLocationCode,
      }),
    )

    return {
      checkout: toCheckout(data.setShippingAddressOnCart.cart),
    }
  }
}
