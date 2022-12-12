import CartResetted from '#ioc/errors/CartResetted'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof CartResetted) {
      showErrorNotification(t('errors.cartExpired'))
    } else {
      throw error
    }
  }
}
