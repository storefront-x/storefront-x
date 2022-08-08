import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'
import Review from '#ioc/graphql/fragments/Review'
import CATALOG_REVIEWS_PER_PAGE from '#ioc/config/CATALOG_REVIEWS_PER_PAGE'

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
            reviews: field()
              .args({
                pageSize: CATALOG_REVIEWS_PER_PAGE,
              })
              .fields({
                items: field({
                  ...Review(),
                }),
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
