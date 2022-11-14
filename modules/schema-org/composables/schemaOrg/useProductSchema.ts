import useProduct from '#ioc/composables/useProduct'
import useHasSchemaOrg from '#ioc/composables/schemaOrg/useHasSchemaOrg'

export default (product: ReturnType<typeof useProduct>) => {
  const dataMapper = {
    '@context': 'http://schema.org',
    '@type': 'product',
    'category': product.categories.map((category: any) => category.name).join('|'),
    'name': product.name,
    'mpn': product.sku,
    'sku': product.sku,
    'image': product.thumbnailUrl,
    'AggregateRating': {
      ratingCount: 0,
      reviewCount: 0,
    },
  }

  useHasSchemaOrg(dataMapper)
}
