import field from '#ioc/graphql/field'
import ProductLabel from '#ioc/graphql/fragments/ProductLabel'

export default (self: any) => {
  return () => {
    const fragment = self()
    fragment.ProductInListing.fields({
      product_labels: field({
        items: field({
          ...ProductLabel(),
        }),
      }),
    })

    return fragment
  }
}
