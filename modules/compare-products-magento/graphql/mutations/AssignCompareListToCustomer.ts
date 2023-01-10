import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import CompareList from '#ioc/graphql/fragments/CompareList'

export default () =>
  mutation()
    .variables({
      $uid: 'ID!',
    })
    .fields({
      assignCompareListToCustomer: field()
        .args({
          uid: '$uid',
        })
        .fields({
          compare_list: field({
            ...CompareList(),
          }),
        }),
    })
