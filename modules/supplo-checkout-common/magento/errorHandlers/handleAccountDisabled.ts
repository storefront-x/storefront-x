import isAccountDisabled from '#ioc/utils/graphql/isAccountDisabled'
import AccountIsDisabled from '#ioc/errors/AccountIsDisabled'
import useFlashMessages from '#ioc/composables/useFlashMessages'

export default () => {
  const flashMessages = useFlashMessages()

  return async (error: any) => {
    if (isAccountDisabled(error)) {
      flashMessages.add({
        type: 'ERROR',
        title: 'title',
        message: 'accountIsDisabled',
      })
      throw new AccountIsDisabled(error.message)
    }
  }
}
