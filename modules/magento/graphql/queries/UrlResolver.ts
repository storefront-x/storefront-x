import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'
import on from '#ioc/graphql/on'

export default () =>
  query()
    .variables({ $url: 'String!' })
    .fields({
      route: field()
        .args({
          url: '$url',
        })
        .fields({
          type: field(),
          redirect_code: field(),
          relative_url: field(),
          ...on('SimpleProduct ', {
            sku: field(),
            url_key: field(),
            uid: field(),
            type: field(),
          }),
          ...on('ConfigurableProduct ', {
            sku: field(),
            url_key: field(),
            uid: field(),
            type: field(),
          }),
          ...on('CategoryTree', {
            name: field(),
            product_count: field(),
            uid: field(),
          }),
          ...on('CmsPage', {
            identifier: field(),
          }),
        }),
    })
