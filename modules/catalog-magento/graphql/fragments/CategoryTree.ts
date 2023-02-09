import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'categoryTree') =>
  fragment(name, 'CategoryTree', {
    __typename: field(),
    id: field(),
    image: field(),
    name: field(),
    url_key: field(),
    url_path: field(),
    url_suffix: field(),
  })
