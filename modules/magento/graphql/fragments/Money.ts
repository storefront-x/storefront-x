import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'money') =>
  fragment(name, 'Money', {
    value: field(),
    currency: field(),
  })
