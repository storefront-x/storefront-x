import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import CompareList from '#ioc/graphql/fragments/CompareList'

export default () =>
  mutation()
    .variables({
      $input: 'CreateCompareListInput',
    })
    .fields({
      createCompareList: field()
        .args({ input: '$input' })
        .fields({
          ...CompareList(),
        }),
    })
