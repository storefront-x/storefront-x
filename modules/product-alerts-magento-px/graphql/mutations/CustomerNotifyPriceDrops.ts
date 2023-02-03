import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

export default () =>
  mutation()
    .variables({
      $productId: 'String!',
    })
    .fields({
      CustomerNotifyPriceDrops: field()
        .args({
          product_id: '$productId',
        })
        .fields({
          customer_email: field(),
        }),
    })
