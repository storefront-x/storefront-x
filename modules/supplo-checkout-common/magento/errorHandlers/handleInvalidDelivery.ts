import isInvalidDeliveryDate from '#ioc/utils/graphql/isInvalidDeliveryDate'
import DeliveryNotValid from '#ioc/errors/DeliveryNotValid'
import useFlashMessages from '#ioc/composables/useFlashMessages'

export default () => {
  const flashMessages = useFlashMessages()

  return async (error: any) => {
    if (isInvalidDeliveryDate(error)) {
      flashMessages.add({
        type: 'ERROR',
        title: 'title',
        message: 'deliveryDateExpired',
      })
      throw new DeliveryNotValid(error.message)
    }
  }
}
