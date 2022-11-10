import field from '#ioc/graphql/field'
import Wishlist from '#ioc/graphql/fragments/Wishlist'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $id: 'ID!',
      $items: '[WishlistItemInput!]!',
    })
    .fields({
      addProductsToWishlist: field()
        .args({
          wishlistId: '$id',
          wishlistItems: '$items',
        })
        .fields({
          wishlist: field({
            ...Wishlist(),
          }),
          user_errors: field({
            message: field(),
            code: field(),
          }),
        }),
    })
