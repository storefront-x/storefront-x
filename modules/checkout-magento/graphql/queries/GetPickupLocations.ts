import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .variables({
      $productsInfo: '[ProductInfoInput]',
    })
    .fields({
      pickupLocations: field()
        .args({
          productsInfo: '$productsInfo',
        })
        .fields({
          items: field({
            city: field(),
            country_id: field(),
            description: field(),
            email: field(),
            latitude: field(),
            longitude: field(),
            name: field(),
            phone: field(),
            pickup_location_code: field(),
            postcode: field(),
            street: field(),
          }),
        }),
    })
