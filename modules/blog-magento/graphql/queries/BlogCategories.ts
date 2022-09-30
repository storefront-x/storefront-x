import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query().fields({
    amBlogCategories: field().fields({
      items: field({
        name: field(),
        url_key: field(),
        post_count: field(),
      }),
    }),
  })
