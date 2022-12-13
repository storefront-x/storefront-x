import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'
import ProductSimple from '#ioc/graphql/fragments/ProductSimple'
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
              ...ProductSimple(),
            }),
            upsell_products: field({
              ...ProductSimple(),
            }),
          }),
        }),
    })
