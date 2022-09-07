import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .variables({
      $identifiers: '[String]',
    })
    .fields({
      cmsBlocks: field()
        .args({
          identifiers: '$identifiers',
        })
        .fields({
          items: field({
            content: field(),
            identifier: field(),
            title: field(),
          }),
        }),
    })
