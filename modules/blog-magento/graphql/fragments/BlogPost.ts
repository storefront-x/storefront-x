import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'blogPost') =>
  fragment(name, 'AmBlogPostInterface', {
    __typename: field(),
    categories: field(),
    full_content: field(),
    meta_description: field(),
    meta_title: field(),
    post_id: field(),
    post_thumbnail: field(),
    list_thumbnail: field(),
    short_content: field(),
    title: field(),
    url_key: field(),
    tag_ids: field(),
    author_id: field(),
    related_post_ids: field(),
    published_at: field(),
  })
