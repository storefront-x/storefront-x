import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'
import isAuthorizationError from '#ioc/utils/graphql/isAuthorizationError'
import useFlashMessages from '#ioc/composables/useFlashMessages'

export default () => {
  const flashMessages = useFlashMessages()
  return async (error: any) => {
    if (isAuthorizationError(error)) {
      flashMessages.add({
        type: 'ERROR',
        title: 'Authorization error',
        message: 'authorizationError',
      })
      throw new CustomerNotAuthorized(error.message)
    }
  }
}
