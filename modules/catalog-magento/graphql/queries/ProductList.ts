import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import ProductInCategory from '#ioc/graphql/fragments/ProductInCategory'

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
            ...ProductInCategory(),
          }),
        }),
    })
