import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query().fields({
    categories: field().fields({
      items: field({
        id: field(),
        children: field({
          id: field(),
          name: field(),
          url_path: field(),
          image: field(),
          children: field({
            id: field(),
            name: field(),
            url_path: field(),
            image: field(),
            children: field({
              id: field(),
              name: field(),
              url_path: field(),
              image: field(),
            }),
          }),
        }),
      }),
    }),
  })
