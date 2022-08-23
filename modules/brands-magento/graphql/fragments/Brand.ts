import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'brand') =>
  fragment(name, 'Brand', {
    brandId: field(),
    label: field(),
    url: field(),
    description: field(),
    image: field(),
  })
