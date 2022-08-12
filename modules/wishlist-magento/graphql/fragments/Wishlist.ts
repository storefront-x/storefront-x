import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Product from '#ioc/graphql/fragments/Product'

export default (name = 'wishlist') =>
  fragment(name, 'Wishlist')
    .cantBeCached()
    .fields({
      id: field(),
      items: field({
        id: field(),
        product: field({
          ...Product(),
        }),
      }),
    })
