import AccountIsDisabled from '#ioc/errors/AccountIsDisabled'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()

  return (error: any) => {
    if (error instanceof AccountIsDisabled) {
      showErrorNotification(t('errors.accountIsDisabled'))
    } else {
      throw error
    }
  }
}
