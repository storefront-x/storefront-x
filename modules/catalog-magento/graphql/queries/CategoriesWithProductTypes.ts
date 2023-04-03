import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import CategoryTree from '#ioc/graphql/fragments/CategoryTree'

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
            ...CategoryTree(),
            products: field({
              total_count: field(),
              items: field({
                __typename: field(),
              }),
            }),
          }),
        }),
    })
