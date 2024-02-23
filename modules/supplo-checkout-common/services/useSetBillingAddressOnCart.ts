import ToShippingAddress from '#ioc/mappers/ToShippingAddress'
import useSetBillingAddressOnCartRepository from '#ioc/repositories/useSetBillingAddressOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCartStore from '#ioc/stores/useCartStore'

export default () => {
  const cartStore = useCartStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setBillingAddressOnCartRepository = useSetBillingAddressOnCartRepository()

  return async (billingAddress: ReturnType<typeof ToShippingAddress>) => {
    const { id } = await getOrCreateCartId()

    const { cart } = await setBillingAddressOnCartRepository(id, {
      telephone: billingAddress.phoneNumber,
      firstname: billingAddress.firstName,
      lastname: billingAddress.lastName,
      street: billingAddress.street,
      city: billingAddress.city,
      country_code: billingAddress.countryCode,
      postcode: billingAddress.zipcode,
      save_in_address_book: false,
    })

    cartStore.$patch({ cart })
  }
}
