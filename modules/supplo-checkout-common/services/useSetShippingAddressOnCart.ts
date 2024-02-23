import ToShippingAddress from '#ioc/mappers/ToShippingAddress'
import useSetShippingAddressOnCartRepository from '#ioc/repositories/useSetShippingAddressOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setShippingAddressOnCartRepository = useSetShippingAddressOnCartRepository()

  return async (shippingAddress: ReturnType<typeof ToShippingAddress>) => {
    const { id } = await getOrCreateCartId()

    const { cart } = await setShippingAddressOnCartRepository(id, {
      address: {
        telephone: shippingAddress.phoneNumber,
        firstname: shippingAddress.firstName,
        lastname: shippingAddress.lastName,
        street: shippingAddress.street,
        city: shippingAddress.city,
        country_code: shippingAddress.countryCode,
        postcode: shippingAddress.zipcode,
        save_in_address_book: false,
      },
      customerNotes: shippingAddress.customerNotes,
      pickupLocationCode: shippingAddress.pickupLocationCode,
    })

    cartStore.$patch({ cart })
  }
}
