import field from '#ioc/graphql/field'

export default () => ({
  amount: field({
    value: field(),
    currency: field(),
  }),
  label: field(),
})
