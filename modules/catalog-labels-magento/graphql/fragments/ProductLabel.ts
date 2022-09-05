import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'productLabel') =>
  fragment(name, 'AmLabel', {
    label_id: field(),
    image: field(),
    style: field(),
    size: field(),
    txt: field(),
  })
