import useToShippingAddress from '#ioc/mappers/useToShippingAddress'
import useSetShippingAddressOnCartRepository from '#ioc/repositories/useSetShippingAddressOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setShippingAddressOnCartRepository = useSetShippingAddressOnCartRepository()

  return async (shippingAddress: ReturnType<ReturnType<typeof useToShippingAddress>>) => {
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
      },
      pickupLocationCode: shippingAddress.pickupLocationCode,
    })

    checkoutStore.$patch(checkout)
  }
}
