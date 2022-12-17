import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'
import ProductInCategory from '#ioc/graphql/fragments/ProductInCategory'
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
              ...ProductInCategory().inline(),
            }),
            upsell_products: field({
              ...ProductInCategory().inline(),
            }),
          }),
        }),
    })
