import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import CustomerNotVerified from '#ioc/errors/CustomerNotVerified'
import useLocalePath from '#ioc/composables/useLocalePath'
import redirect from '#ioc/utils/redirect'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()
  const localePath = useLocalePath()

  return (error: any) => {
    if (error instanceof CustomerNotVerified) {
      redirect(localePath('sign-in'), 302)
      showErrorNotification(t('errors.customerNotAuthorized'))
    } else {
      throw error
    }
  }
}
