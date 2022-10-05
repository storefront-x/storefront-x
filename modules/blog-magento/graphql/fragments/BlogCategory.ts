import field from '#ioc/graphql/field'
import fragment from '#ioc/graphql/fragment'

export default (name = 'blogCategory') =>
  fragment(name, 'AmBlogCategory', {
    __typename: field(),
    meta_title: field(),
    meta_description: field(),
    category_id: field(),
    name: field(),
    parent_id: field(),
    post_count: field(),
    url_key: field(),
  })
