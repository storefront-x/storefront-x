import useMagento from '#ioc/composables/useMagento'
import SetShippingAddressOnCart from '#ioc/graphql/mutations/SetShippingAddressOnCart'
import ToCart from '#ioc/mappers/ToCart'

export default () => {
  const magento = useMagento()

  return async (cartId: string, { address, customerAddressId, customerNotes, pickupLocationCode }: any) => {
    const { data } = await magento.graphql(
      SetShippingAddressOnCart().with({
        cartId,
        address,
        customerAddressId,
        customerNotes,
        pickupLocationCode,
      }),
    )

    return {
      cart: ToCart(data.setShippingAddressOnCart.cart),
    }
  }
}
