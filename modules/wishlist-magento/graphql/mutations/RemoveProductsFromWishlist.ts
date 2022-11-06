import field from '#ioc/graphql/field'
import Wishlist from '#ioc/graphql/fragments/Wishlist'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $id: 'ID!',
      $itemIds: '[ID!]!',
    })
    .fields({
      removeProductsFromWishlist: field()
        .args({
          wishlistId: '$id',
          wishlistItemsIds: '$itemIds',
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
