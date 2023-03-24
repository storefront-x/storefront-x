import useI18n from '#ioc/composables/useI18n'
import CustomerNotVerified from '#ioc/errors/CustomerNotVerified'
import useLocalePath from '#ioc/composables/useLocalePath'
import redirect from '#ioc/utils/redirect'

export default () => {
  const { t } = useI18n()
  const localePath = useLocalePath()

  return (error: any) => {
    if (error instanceof CustomerNotVerified) {
      redirect(localePath('sign-in'), 302, {
        level: 'ERROR',
        message: t('errors.customerNotVerified'),
      })
    } else {
      throw error
    }
  }
}
