import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'
import ProductInListing from '#ioc/graphql/fragments/ProductInListing'

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
              ...ProductInListing(),
            }),
            upsell_products: field({
              ...ProductInListing(),
            }),
          }),
        }),
    })
