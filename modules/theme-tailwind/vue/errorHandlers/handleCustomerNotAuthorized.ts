import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import CustomerNotAuthorized from '#ioc/errors/CustomerNotAuthorized'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof CustomerNotAuthorized) {
      showErrorNotification(t('errors.authorizationError'))
    } else {
      throw error
    }
  }
}
