import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import ProductInListing from '#ioc/graphql/fragments/ProductInListing'

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
              ...ProductInListing(),
            }),
          }),
        }),
    })
