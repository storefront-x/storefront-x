import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Customer from '#ioc/graphql/fragments/Customer'

export default () =>
  mutation()
    .variables({
      $input: 'CustomerUpdateInput!',
    })
    .fields({
      updateCustomer: field('updateCustomerV2')
        .args({
          input: '$input',
        })
        .fields({
          customer: field({
            ...Customer(),
          }),
        }),
    })
