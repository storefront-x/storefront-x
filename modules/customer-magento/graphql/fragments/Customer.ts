import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'customer') =>
  fragment(name, 'Customer', {
    email: field(),
    firstname: field(),
    lastname: field(),
    middlename: field(),
    prefix: field(),
    suffix: field(),
    date_of_birth: field(),
    gender: field(),
    is_subscribed: field(),
  })
