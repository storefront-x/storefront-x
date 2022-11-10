import ToBlogCategory from '#ioc/mappers/ToBlogCategory'
import useHasSchemaOrg from '#ioc/composables/schemaOrg/useHasSchemaOrg'

export default (category: ReturnType<typeof ToBlogCategory>) => {
  const dataMapper = {
    '@context': 'http://schema.org',
    '@type': 'category',
    'title': category.name,
  }

  useHasSchemaOrg(dataMapper)
}
