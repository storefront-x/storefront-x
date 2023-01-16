import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'
import CompareList from '#ioc/graphql/fragments/CompareList'

export default () =>
  query()
    .variables({
      $uid: 'ID!',
    })
    .fields({
      compareList: field()
        .args({
          uid: '$uid',
        })
        .fields({
          ...CompareList(),
        }),
    })
