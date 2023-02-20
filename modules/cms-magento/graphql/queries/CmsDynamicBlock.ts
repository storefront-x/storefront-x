import field from '#ioc/graphql/field'
import query from '#ioc/graphql/query'

export default () =>
  query()
    .variables({
      $input: 'DynamicBlocksFilterInput',
    })
    .fields({
      dynamicBlocks: field()
        .args({
          input: '$input',
        })
        .fields({
          items: field({
            uid: field(),
            content: field({
              html: field(),
            }),
          }),
        }),
    })
