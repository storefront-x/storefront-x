import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import ProductSimple from '#ioc/graphql/fragments/ProductSimple'

export default (name = 'wishlist') =>
  fragment(name, 'Wishlist')
    .cantBeCached()
    .fields({
      id: field(),
      items: field({
        id: field(),
        product: field({
          ...ProductSimple(),
        }),
      }),
    })
