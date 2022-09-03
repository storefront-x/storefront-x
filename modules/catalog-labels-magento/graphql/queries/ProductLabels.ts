import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import ProductLabel from '#ioc/graphql/fragments/ProductLabel'

export default () =>
  query()
    .variables({
      $productIds: '[Int]!',
      $mode: 'AmLabelMode',
    })
    .fields({
      amLabelProvider: field()
        .args({ productIds: '$productIds', mode: '$mode' })
        .fields({
          items: field({
            ...ProductLabel(),
          }),
        }),
    })
