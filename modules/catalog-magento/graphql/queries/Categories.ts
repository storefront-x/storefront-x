import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query()
    .variables({
      $id: 'String!',
    })
    .fields({
      categories: field()
        .args({ filters: { parent_id: { eq: '$id' } } })
        .fields({
          items: field({
            __typename: field(),
            name: field(),
            url_key: field(),
            url_suffix: field(),
            products: field({
              total_count: field(),
            }),
          }),
        }),
    })
