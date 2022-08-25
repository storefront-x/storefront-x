import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'

export default () =>
  query()
    .cantBeCached()
    .fields({
      customerDownloadableProducts: field({
        items: field({
          date: field(),
          download_url: field(),
          order_increment_id: field(),
          remaining_downloads: field(),
          status: field(),
        }),
      }),
    })
