import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'aggregation') =>
  fragment(name, 'Aggregation', {
    attribute_code: field(),
    count: field(),
    label: field(),
    options: field({
      count: field(),
      label: field(),
      value: field(),
    }),
  })
