import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import Product from '#ioc/graphql/fragments/Product'
import Aggregation from '#ioc/graphql/fragments/Aggregation'

export default () =>
  query()
    .variables({
      $id: 'String!',
      $pageSize: 'Int!',
      $currentPage: 'Int!',
      $sort: 'ProductAttributeSortInput',
      $filter: 'ProductAttributeFilterInput',
    })
    .fields({
      categoryList: field()
        .args({ filters: { category_uid: { eq: '$id' } } })
        .fields({
          id: field(),
          name: field(),
          url_path: field(),
          image: field(),
          description: field(),
          breadcrumbs: field({
            category_name: field(),
            category_url_path: field(),
          }),
          children: field({
            id: field(),
            name: field(),
            url_path: field(),
            thumbnail: field(),
            products: field({
              total_count: field(),
            }),
          }),
          meta_title: field(),
          meta_description: field(),
          meta_keywords: field(),
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
        .args({ filter: '$filter' })
        .fields({
          aggregations: field({
            ...Aggregation(),
          }),
        }),
    })
