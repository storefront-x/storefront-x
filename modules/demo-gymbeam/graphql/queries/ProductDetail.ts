import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'
import ProductInListing from '#ioc/graphql/fragments/ProductInListing'
export default () =>
  query()
    .variables({
      $sku: 'String!',
    })
    .fields({
      products: field()
        .args({ search: '$sku' })
        .fields({
          items: field({
            ...Product(),
            related_products: field({
              ...ProductInListing().inline(),
            }),
            upsell_products: field({
              ...ProductInListing().inline(),
            }),
          }),
        }),
    })
