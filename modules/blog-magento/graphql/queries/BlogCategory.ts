import query from '#ioc/graphql/query'
import field from '#ioc/graphql/field'
import BlogCategory from '#ioc/graphql/fragments/BlogCategory'

export default () =>
  query()
    .variables({
      $id: 'Int',
    })
    .fields({
      amBlogCategory: field()
        .args({
          id: '$id',
        })
        .fields({
          ...BlogCategory(),
        }),
    })
