import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'childSku') =>
  fragment(name, 'ChildSku').cantBeCached().fields({
    cart_item_id: field(),
    sku: field(),
  })
