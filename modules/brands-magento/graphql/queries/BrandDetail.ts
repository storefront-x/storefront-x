import field from '#ioc/graphql/field'
import Brand from '#ioc/graphql/fragments/Brand'
import Product from '#ioc/graphql/fragments/Product'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .variables({
      $id: 'Int!',
      $manufacturer: 'String!',
      $pageSize: 'Int!',
      $currentPage: 'Int!',
      $sort: 'ProductAttributeSortInput',
      $filter: 'ProductAttributeFilterInput',
    })
    .fields({
      amBrandById: field()
        .args({
          brandId: '$id',
        })
        .fields({
          ...Brand(),
        }),
      products: field()
        .args({
          pageSize: '$pageSize',
          currentPage: '$currentPage',
          sort: '$sort',
          filter: '$filter',
        })
        .fields({
          total_count: field(),
          items: field({
            ...Product(),
          }),
        }),
      aggregations: field('products')
        .args({ filter: { manufacturer: { eq: '$manufacturer' } } })
        .fields({
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
