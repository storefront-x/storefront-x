import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .variables({ $url: 'String!' })
    .fields({
      urlResolver: field()
        .args({
          url: '$url',
        })
        .fields({
          id: field(),
          entity_uid: field(),
          type: field(),
          redirectCode: field(),
          relative_url: field(),
        }),
    })
