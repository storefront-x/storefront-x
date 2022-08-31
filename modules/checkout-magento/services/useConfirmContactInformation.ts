import useToContactInformation from '#ioc/mappers/useToContactInformation'
import useSetBillingAddressOnCartRepository from '#ioc/repositories/useSetBillingAddressOnCartRepository'
import useSetGuestEmailOnCartRepository from '#ioc/repositories/useSetGuestEmailOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setGuestEmailOnCartRepository = useSetGuestEmailOnCartRepository()
  const setBillingAddressOnCartRepository = useSetBillingAddressOnCartRepository()

  return async (contactInformation: ReturnType<ReturnType<typeof useToContactInformation>>) => {
    const { id } = await getOrCreateCartId()

    await setGuestEmailOnCartRepository(id, contactInformation.email)

    const { checkout } = await setBillingAddressOnCartRepository(
      id,
      {
        telephone: contactInformation.telephone,
        firstname: contactInformation.firstName,
        lastname: contactInformation.lastName,
        street: contactInformation.street,
        city: contactInformation.city,
        country_code: contactInformation.countryCode,
        postcode: contactInformation.postcode,
      },
      {
        sameAsShipping: true,
      },
    )

    checkoutStore.$patch(checkout)
  }
}
