import useShopware from '#ioc/composables/useShopware'
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
      countryId: 'ff87855aace845db9a76646f1c855edb',
      salutationId: 'c6872ce3c6fe4b1cbecbc7e3543f68e1',
      storefrontUrl: 'https://shopware-pwa-canary.storefrontcloud.io', // TODO
      redirectTo: '/checkout', // TODO
      billingAddress: {
        firstName: contactInformation.firstName,
        lastName: contactInformation.lastName,
        city: contactInformation.city,
        street: contactInformation.street,
        zipcode: contactInformation.zipcode,
        countryId: 'ff87855aace845db9a76646f1c855edb',
        salutationId: 'c6872ce3c6fe4b1cbecbc7e3543f68e1',
      },
    })
  }
}
