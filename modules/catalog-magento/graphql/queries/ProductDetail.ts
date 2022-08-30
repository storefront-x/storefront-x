import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'
export default () =>
  query()
    .variables({
      $urlKey: 'String!',
    })
    .fields({
      products: field()
        .args({ filter: { url_key: { eq: '$urlKey' } } })
        .fields({
          items: field({
            ...Product(),
            related_products: field({
              ...Product().inline(),
            }),
            upsell_products: field({
              ...Product().inline(),
            }),
          }),
          aggregations: field({
            attribute_code: field(),
            label: field(),
            options: field({
              label: field(),
            }),
          }),
        }),
    })
