import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import ProductSimple from '#ioc/graphql/fragments/ProductSimple'

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
            ...ProductSimple(),
          }),
        }),
    })
