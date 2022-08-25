import field from '#ioc/graphql/field'
import Address from '#ioc/graphql/fragments/Address'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $id: 'Int!',
      $region: 'CustomerAddressRegionInput',
      $countryCode: 'CountryCodeEnum!',
      $street: '[String]',
      $telephone: 'String',
      $postcode: 'String',
      $city: 'String',
      $firstName: 'String',
      $lastName: 'String',
      $defaultShipping: 'Boolean',
      $defaultBilling: 'Boolean',
    })
    .fields({
      updateCustomerAddress: field()
        .args({
          id: '$id',
          input: {
            region: '$region',
            country_code: '$countryCode',
            street: '$street',
            telephone: '$telephone',
            postcode: '$postcode',
            city: '$city',
            firstname: '$firstName',
            lastname: '$lastName',
            default_shipping: '$defaultShipping',
            default_billing: '$defaultBilling',
          },
        })
        .fields({
          ...Address(),
        }),
    })
