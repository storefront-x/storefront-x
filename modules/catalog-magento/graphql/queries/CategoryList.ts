import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import CategoryTree from '#ioc/graphql/fragments/CategoryTree'

export default () =>
  query().fields({
    categories: field().fields({
      items: field({
        id: field(),
        children: field({
          ...CategoryTree(),
          children: field({
            ...CategoryTree(),
            children: field({
              ...CategoryTree(),
            }),
          }),
        }),
      }),
    }),
  })
