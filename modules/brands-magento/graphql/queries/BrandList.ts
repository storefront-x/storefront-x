import field from '#ioc/graphql/field'
import Brand from '#ioc/graphql/fragments/Brand'
import query from '#ioc/graphql/query'

export default () =>
  query({
    ambrandlist: field({
      items: field({
        ...Brand(),
      }),
    }),
  })
