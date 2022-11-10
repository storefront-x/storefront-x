import useBlogPost from '#ioc/composables/useBlogPost'
import useHasSchemaOrg from '#ioc/composables/schemaOrg/useHasSchemaOrg'

export default (post: ReturnType<typeof useBlogPost>) => {
  const dataMapper = {
    '@context': 'http://schema.org',
    '@type': 'article',
    'title': post.title,
  }

  useHasSchemaOrg(dataMapper)
}
