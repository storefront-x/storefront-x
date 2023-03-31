import field from '#ioc/graphql/field'
import Brand from '#ioc/graphql/fragments/Brand'
import ProductInListing from '#ioc/graphql/fragments/ProductInListing'
import query from '#ioc/graphql/query'
import ATTRIBUTE_NAME from '#ioc/config/brands-magento/ATTRIBUTE_NAME'

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
            ...ProductInListing(),
          }),
        }),
      aggregations: field('products')
        .args({ filter: { [ATTRIBUTE_NAME]: { eq: '$manufacturer' } } })
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
