import field from '#ioc/graphql/field'

export default () => ({
  __typename: field(),
  value: field({
    option_type_id: field(),
    price: field(),
    price_type: field(),
    sku: field(),
    title: field(),
    uid: field(),
  }),
})
