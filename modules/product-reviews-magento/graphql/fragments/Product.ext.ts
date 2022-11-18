import field from '#ioc/graphql/field'

export default (self: any) => {
  return () => {
    const fragment = self()
    fragment.product.fields({
      rating_summary: field(),
    })

    return fragment
  }
}
