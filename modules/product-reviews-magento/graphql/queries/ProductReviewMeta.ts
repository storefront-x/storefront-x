import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query().fields({
    productReviewRatingsMetadata: field({
      items: field({
        id: field(),
        name: field(),
        values: field({
          value: field(),
          value_id: field(),
        }),
      }),
    }),
  })
