import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'
import Customer from '#ioc/graphql/fragments/Customer'

export default () =>
  mutation()
    .variables({
      $email: 'String!',
      $newPassword: 'String!',
      $resetPasswordToken: 'String!',
    })
    .fields({
      resetPassword: field().args({
        email: '$email',
        newPassword: '$newPassword',
        resetPasswordToken: '$resetPasswordToken',
      }),
    })
