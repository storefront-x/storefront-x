import field from '#ioc/graphql/field'
import Wishlist from '#ioc/graphql/fragments/Wishlist'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .cantBeCached()
    .fields({
      customer: field({
        wishlists: field({
          ...Wishlist(),
        }),
      }),
    })
