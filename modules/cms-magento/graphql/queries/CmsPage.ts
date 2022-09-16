import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .variables({
      $id: 'Int!',
    })
    .fields({
      cmsPage: field()
        .args({
          id: '$id',
        })
        .fields({
          content: field(),
          title: field(),
          meta_title: field(),
          meta_description: field(),
          meta_keywords: field(),
        }),
    })
