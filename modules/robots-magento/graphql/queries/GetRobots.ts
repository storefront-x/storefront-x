import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query({
    storeConfig: field({
      design_search_engine_robots_default_robots: field(),
    }),
  })
