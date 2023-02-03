import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'
import Product from '#ioc/graphql/fragments/Product'

export default (name = 'compareList') =>
  fragment(name, 'CompareList')
    .cantBeCached()
    .fields({
      uid: field(),
      item_count: field(),
      attributes: field({
        code: field(),
        label: field(),
      }),
      items: field({
        uid: field(),
        product: field({
          ...Product(),
        }),
        attributes: field({
          code: field(),
          value: field(),
        }),
      }),
    })
