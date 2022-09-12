import ToContactInformation from '#ioc/mappers/ToContactInformation'
import useSetShippingAddressOnCartRepository from '#ioc/repositories/useSetShippingAddressOnCartRepository'
import useSetBillingAddressOnCartRepository from '#ioc/repositories/useSetBillingAddressOnCartRepository'
import useSetGuestEmailOnCartRepository from '#ioc/repositories/useSetGuestEmailOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'
import useCustomer from '#ioc/composables/useCustomer'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setGuestEmailOnCartRepository = useSetGuestEmailOnCartRepository()
  const setShippingAddressOnCartRepository = useSetShippingAddressOnCartRepository()
  const setBillingAddressOnCartRepository = useSetBillingAddressOnCartRepository()
  const customer = useCustomer()

  return async (contactInformation: ReturnType<typeof ToContactInformation>) => {
    const { id } = await getOrCreateCartId()

    if (!customer.isLoggedIn) {
      await setGuestEmailOnCartRepository(id, contactInformation.email)
    }

    {
      const { checkout } = await setShippingAddressOnCartRepository(id, {
        address: {
          telephone: contactInformation.telephone,
          firstname: contactInformation.firstName,
          lastname: contactInformation.lastName,
          street: contactInformation.street,
          city: contactInformation.city,
          country_code: contactInformation.countryCode,
          postcode: contactInformation.postcode,
        },
      })

      checkoutStore.$patch(checkout)
    }

    {
      const { checkout } = await setBillingAddressOnCartRepository(id, {
        telephone: contactInformation.telephone,
        firstname: contactInformation.firstName,
        lastname: contactInformation.lastName,
        street: contactInformation.street,
        city: contactInformation.city,
        country_code: contactInformation.countryCode,
        postcode: contactInformation.postcode,
      })

      checkoutStore.$patch(checkout)
    }
  }
}
