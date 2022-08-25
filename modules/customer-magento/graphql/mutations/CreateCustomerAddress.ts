import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Address from '#ioc/graphql/fragments/Address'

export default () =>
  mutation()
    .variables({
      $region: 'CustomerAddressRegionInput',
      $countryCode: 'CountryCodeEnum!',
      $street: '[String]',
      $telephone: 'String!',
      $postcode: 'String!',
      $city: 'String!',
      $firstName: 'String!',
      $lastName: 'String!',
      $defaultShipping: 'Boolean',
      $defaultBilling: 'Boolean',
    })
    .fields({
      createCustomerAddress: field()
        .args({
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
