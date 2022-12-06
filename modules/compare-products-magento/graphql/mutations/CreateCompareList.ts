import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({})
    .fields({
      createCompareList: field().fields({
        uid: field(),
      }),
    })
