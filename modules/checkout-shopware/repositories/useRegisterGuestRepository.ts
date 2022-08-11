import useShopware from '#ioc/composables/useShopware'
import SHOPWARE_URL from '#ioc/config/SHOPWARE_URL'
import useToContactInformation from '#ioc/mappers/useToContactInformation'

interface Options {
  contactInformation: ReturnType<ReturnType<typeof useToContactInformation>>
}

export default () => {
  const shopware = useShopware()

  return async ({ contactInformation }: Options) => {
    await shopware.post('/account/register', {
      guest: true,
      password: '',
      email: contactInformation.email,
      firstName: contactInformation.firstName,
      lastName: contactInformation.lastName,
      countryId: contactInformation.country.id,
      salutationId: contactInformation.salutation.id,
      storefrontUrl: SHOPWARE_URL,
      redirectTo: '/', // TODO
      billingAddress: {
        firstName: contactInformation.firstName,
        lastName: contactInformation.lastName,
        city: contactInformation.city,
        street: contactInformation.street,
        zipcode: contactInformation.zipcode,
        countryId: contactInformation.country.id,
        salutationId: contactInformation.salutation.id,
      },
    })
  }
}
