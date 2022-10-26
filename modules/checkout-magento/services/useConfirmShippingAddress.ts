import ToShippingAddress from '#ioc/mappers/ToShippingAddress'
import useSetShippingAddressOnCartRepository from '#ioc/repositories/useSetShippingAddressOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setShippingAddressOnCartRepository = useSetShippingAddressOnCartRepository()

  return async (shippingAddress: ReturnType<typeof ToShippingAddress>) => {
    const { id } = await getOrCreateCartId()

    const { checkout } = await setShippingAddressOnCartRepository(id, {
      address: {
        telephone: shippingAddress.telephone,
        firstname: shippingAddress.firstName,
        lastname: shippingAddress.lastName,
        street: shippingAddress.street,
        city: shippingAddress.city,
        country_code: shippingAddress.countryCode,
        postcode: shippingAddress.postcode,
        save_in_address_book: false,
      },
      customerNotes: shippingAddress.customerNotes,
      pickupLocationCode: shippingAddress.pickupLocationCode,
    })

    checkoutStore.$patch(checkout)
  }
}
