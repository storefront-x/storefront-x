import field from '#ioc/graphql/field'
import ProductLabel from '#ioc/graphql/fragments/ProductLabel'

export default (self: any) => {
  const fragment = self()
  fragment.product.fields({
    product_labels: field({
      items: field({
        ...ProductLabel(),
      }),
    }),
  })

  return () => fragment
}
