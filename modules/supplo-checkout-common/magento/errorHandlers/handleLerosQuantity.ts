import isInvalidLerosQuantity from '#ioc/utils/graphql/isInvalidLerosQuantity'
import LerosQuantityNotValid from '#ioc/errors/LerosQuantityNotValid'
import useFlashMessages from '#ioc/composables/useFlashMessages'

export default () => {
  const flashMessages = useFlashMessages()

  return async (error: any) => {
    error.message = error.message.replace(/\s+/g, ' ').trim() //hotfix KFL-1189

    if (isInvalidLerosQuantity(error)) {
      flashMessages.add({
        type: 'ERROR',
        title: 'title',
        message: 'lerosQuantityNotValid',
      })
      throw new LerosQuantityNotValid(error.message)
    }
  }
}
