import field from '#ioc/graphql/field'
import Cart from '#ioc/graphql/fragments/Cart'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $orderNumber: 'String!',
    })
    .fields({
      reorderItems: field()
        .args({
          orderNumber: '$orderNumber',
        })
        .fields({
          cart: field({
            ...Cart(),
          }),
          userInputErrors: field({
            message: field(),
          }),
        }),
    })
