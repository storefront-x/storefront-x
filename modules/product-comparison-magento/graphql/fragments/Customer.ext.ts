import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'
import Product from '#ioc/graphql/fragments/Product'

export default (self: any) => {
  return () => {
    const fragment = self()
    addFields(fragment, {
      compare_list: field({
        uid: field(),
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
        attributes: field({
          code: field(),
          label: field(),
        }),
      }),
    })

    return fragment
  }
}
