import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import ProductSimple from '#ioc/graphql/fragments/ProductSimple'

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
              ...ProductSimple().inline(),
            }),
          }),
        }),
    })
