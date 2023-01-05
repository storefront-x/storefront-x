import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $input: 'CreateCompareListInput',
    })
    .fields({
      createCompareList: field().args({ input: '$input' }).fields({
        uid: field(),
      }),
    })
