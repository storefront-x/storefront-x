import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import BlogPost from '#ioc/graphql/fragments/BlogPost'

export default () =>
  query()
    .variables({
      $urlKey: 'String!',
    })
    .fields({
      amBlogPost: field()
        .args({
          urlKey: '$urlKey',
        })
        .fields({
          ...BlogPost(),
        }),
    })
