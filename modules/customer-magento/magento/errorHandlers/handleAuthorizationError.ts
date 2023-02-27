import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import isAuthorizationError from '#ioc/utils/graphql/isAuthorizationError'

export default () => {
  return async (error: any) => {
    if (isAuthorizationError(error)) {
      throw new CustomerNotAuthorized(error.message)
    }
  }
}
