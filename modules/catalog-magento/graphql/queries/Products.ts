import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import ProductSimple from '#ioc/graphql/fragments/ProductSimple'

export default () =>
  query()
    .variables({
      $search: 'String',
      $filter: 'ProductAttributeFilterInput',
      $pageSize: 'Int',
      $currentPage: 'Int',
      $sort: 'ProductAttributeSortInput',
    })
    .fields({
      products: field()
        .args({
          search: '$search',
          filter: '$filter',
          pageSize: '$pageSize',
          currentPage: '$currentPage',
          sort: '$sort',
        })
        .fields({
          total_count: field(),
          items: field({
            ...ProductSimple(),
          }),
          aggregations: field({
            attribute_code: field(),
            count: field(),
            label: field(),
            options: field({
              count: field(),
              label: field(),
              value: field(),
            }),
          }),
        }),
    })
