import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Product from '#ioc/graphql/fragments/Product'

export default () =>
  mutation()
    .variables({
      $input: 'AddProductsToCompareListInput!',
    })
    .fields({
      addProductsToCompareList: field()
        .args({
          input: '$input',
        })
        .fields({
          item_count: field(),
          uid: field(),
          items: field({
            uid: field(),
            product: field({
              ...Product(),
            }),
            attributes: field({
              code: field(),
              value: field(),
            }),
          }),
        }),
    })
