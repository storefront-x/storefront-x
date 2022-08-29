import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import BlogPost from '#ioc/graphql/fragments/BlogPost'

export default () =>
  query()
    .variables({
      $type: 'AmBlogPageType',
      $page: 'Int',
      $id: 'Int',
    })
    .fields({
      amBlogPosts: field()
        .args({
          type: '$type',
          page: '$page',
          entityId: '$id',
        })
        .fields({
          all_post_size: field(),
          items: field({
            ...BlogPost(),
          }),
        }),
    })
