import field from '#ioc/graphql/field'
import mutation from '#ioc/graphql/mutation'

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
