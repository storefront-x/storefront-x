import field from '#ioc/graphql/field'

export default () => ({
  amount: field({
    value: field(),
    currency: field(),
  }),
  title: field(),
  rate: field(),
})
