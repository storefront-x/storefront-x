import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'
import Product from '#ioc/graphql/fragments/Product'

export default () =>
  query()
    .variables({
      $uid: 'Int!',
    })
    .fields({
      compareList: field()
        .args({
          uid: '$uid',
        })
        .fields({
          item_count: field(),
          items: field({
            uid: field(),
            product: field({
              ...Product(),
            }),
            attributes: field({
              code: field(),
              value: field(),
            }),
          }),
        }),
    })
