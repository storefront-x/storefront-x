import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation().variables({}).fields({
    createBraintreeClientToken: field(),
  })
