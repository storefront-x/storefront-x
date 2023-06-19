import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import isAuthorizationError from '#ioc/utils/graphql/isAuthorizationError'
import useCookieMessage from '#ioc/composables/useCookieMessage'

export default () => {
  const cookieMessage = useCookieMessage()
  return async (error: any) => {
    if (isAuthorizationError(error)) {
      cookieMessage.set({
        type: 'ERROR',
        title: 'Authorization error',
        message: 'authorizationError',
      })
      throw new CustomerNotAuthorized(error.message)
    }
  }
}
