import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import BlogPost from '#ioc/graphql/fragments/BlogPost'

export default () =>
  query()
    .variables({
      $id: 'Int!',
    })
    .fields({
      amBlogPost: field()
        .args({
          id: '$id',
        })
        .fields({
          ...BlogPost(),
        }),
    })
