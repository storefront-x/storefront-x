import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import ProductInListing from '#ioc/graphql/fragments/ProductInListing'

export default (name = 'wishlist') =>
  fragment(name, 'Wishlist')
    .cantBeCached()
    .fields({
      id: field(),
      items: field({
        id: field(),
        product: field({
          ...ProductInListing(),
        }),
      }),
    })
