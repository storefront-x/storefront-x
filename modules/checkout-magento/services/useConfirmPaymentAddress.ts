import useToPaymentAddress from '#ioc/mappers/useToPaymentAddress'
import useSetBillingAddressOnCartRepository from '#ioc/repositories/useSetBillingAddressOnCartRepository'
import useGetOrCreateCartId from '#ioc/services/useGetOrCreateCartId'
import useCheckoutStore from '#ioc/stores/useCheckoutStore'

export default () => {
  const checkoutStore = useCheckoutStore()
  const getOrCreateCartId = useGetOrCreateCartId()
  const setBillingAddressOnCartRepository = useSetBillingAddressOnCartRepository()

  return async (billingAddress: ReturnType<ReturnType<typeof useToPaymentAddress>>) => {
    const { id } = await getOrCreateCartId()

    const { checkout } = await setBillingAddressOnCartRepository(id, {
      telephone: billingAddress.telephone,
      firstname: billingAddress.firstName,
      lastname: billingAddress.lastName,
      street: billingAddress.street,
      city: billingAddress.city,
      country_code: billingAddress.countryCode,
      postcode: billingAddress.postcode,
    })

    checkoutStore.$patch(checkout)
  }
}
