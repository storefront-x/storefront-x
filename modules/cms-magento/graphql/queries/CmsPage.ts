import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .variables({
      $identifier: 'String!',
    })
    .fields({
      cmsPage: field()
        .args({
          identifier: '$identifier',
        })
        .fields({
          content: field(),
          title: field(),
          meta_title: field(),
          meta_description: field(),
          meta_keywords: field(),
        }),
    })
