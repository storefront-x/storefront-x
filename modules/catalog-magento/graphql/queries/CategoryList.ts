import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query().fields({
    categoryList: field().fields({
      id: field(),
      children: field({
        id: field(),
        image: field(),
        thumbnail: field(),
        name: field(),
        url_path: field(),
        children: field({
          id: field(),
          name: field(),
          url_path: field(),
          thumbnail: field(),
          children: field({
            id: field(),
            name: field(),
            url_path: field(),
          }),
        }),
      }),
    }),
  })
