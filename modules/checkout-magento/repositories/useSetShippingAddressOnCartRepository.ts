import useMagento from '#ioc/composables/useMagento'
import SetShippingAddressOnCart from '#ioc/graphql/mutations/SetShippingAddressOnCart'
import ToCheckout from '#ioc/mappers/ToCheckout'

export default () => {
  const magento = useMagento()

  return async (cartId: string, { address, customerAddressId, customerNotes }: any) => {
    const setShippingAddressesOnCartInput = {
      cart_id: cartId,
      shipping_addresses: [
        {
          address,
          customer_address_id: customerAddressId,
          customer_notes: customerNotes,
        },
      ],
    }
    const { data } = await magento.graphql(SetShippingAddressOnCart().with({ input: setShippingAddressesOnCartInput }))

    return {
      checkout: ToCheckout(data.setShippingAddressOnCart.cart),
    }
  }
}
