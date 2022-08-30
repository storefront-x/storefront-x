import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Review from '#ioc/graphql/fragments/Review'

export default () =>
  mutation()
    .variables({
      $sku: 'String!',
      $nickname: 'String!',
      $summary: 'String!',
      $text: 'String!',
      $ratings: '[ProductReviewRatingInput]!',
    })
    .fields({
      createProductReview: field()
        .args({
          input: {
            nickname: '$nickname',
            summary: '$summary',
            sku: '$sku',
            text: '$text',
            ratings: '$ratings',
          },
        })
        .fields({
          review: field({
            ...Review(),
          }),
        }),
    })
