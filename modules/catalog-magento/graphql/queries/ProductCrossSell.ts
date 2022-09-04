import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'

export default () =>
  query()
    .variables({
      $sku: 'String!',
    })
    .fields({
      products: field()
        .args({
          filter: { sku: { eq: '$sku' } },
        })
        .fields({
          total_count: field(),
          items: field({
            crosssell_products: field({
              ...Product().inline(),
            }),
          }),
        }),
    })
