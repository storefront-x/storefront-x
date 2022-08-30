import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query({
    storeConfig: field({
      carriers_freeshipping_free_shipping_subtotal: field(),
    }),
  })
