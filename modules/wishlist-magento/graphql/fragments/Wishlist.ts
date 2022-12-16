import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import ProductInCategory from '#ioc/graphql/fragments/ProductInCategory'

export default (name = 'wishlist') =>
  fragment(name, 'Wishlist')
    .cantBeCached()
    .fields({
      id: field(),
      items: field({
        id: field(),
        product: field({
          ...ProductInCategory(),
        }),
      }),
    })
