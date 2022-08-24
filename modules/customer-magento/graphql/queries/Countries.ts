import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query()
    .cantBeCached()
    .fields({
      countries: field({
        id: field(),
        full_name_english: field(),
        full_name_locale: field(),
        available_regions: field({
          id: field(),
          code: field(),
          name: field(),
        }),
      }),
    })
