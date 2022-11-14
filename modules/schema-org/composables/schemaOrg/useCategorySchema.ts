import useCategory from '#ioc/composables/useCategory'
import useHasSchemaOrg from '#ioc/composables/schemaOrg/useHasSchemaOrg'

export default (category: ReturnType<typeof useCategory>) => {
  const dataMapper = {
    '@context': 'http://schema.org',
    '@type': 'ProductGroup',
    'productGroupID': category.name,
  }

  useHasSchemaOrg(dataMapper)
}
