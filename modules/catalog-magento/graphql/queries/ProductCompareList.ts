import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'

export default () =>
  query()
    .variables({
      $skus: '[String]',
    })
    .fields({
      products: field()
        .args({
          filter: { sku: { in: '$skus' } },
        })
        .fields({
          total_count: field(),
          items: field({
            ...Product(),
          }),
        }),
    })
