import field from '#ioc/graphql/field'
import addFields from '#ioc/utils/graphql/addFields'
import Money from '#ioc/graphql/fragments/Money'
import on from '#ioc/graphql/on'

export default (self: any) => {
  return () => {
    const fragment = self()
    addFields(fragment, {
      ...on('BundleProduct', {
        price_view: field(),
        price_range: field({
          minimum_price: field({
            final_price: field({
              ...Money(),
            }),
            regular_price: field({
              ...Money(),
            }),
          }),
          maximum_price: field({
            final_price: field({
              ...Money(),
            }),
            regular_price: field({
              ...Money(),
            }),
          }),
        }),
      }),
    })

    return fragment
  }
}
