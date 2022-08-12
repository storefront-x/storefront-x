import field from '#ioc/graphql/field'
import Wishlist from '#ioc/graphql/fragments/Wishlist'
import query from '#ioc/graphql/query'

export default () =>
  query({
    customer: field({
      wishlists: field({
        ...Wishlist(),
      }),
    }),
  })
