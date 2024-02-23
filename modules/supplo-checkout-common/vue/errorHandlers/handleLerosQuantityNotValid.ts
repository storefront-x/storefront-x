import LerosQuantityNotValid from '#ioc/errors/LerosQuantityNotValid'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof LerosQuantityNotValid) {
      showErrorNotification(t('errors.lerosQuantityNotValid'))
    } else {
      throw error
    }
  }
}
