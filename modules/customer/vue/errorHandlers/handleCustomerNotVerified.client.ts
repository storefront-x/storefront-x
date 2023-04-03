import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import CustomerNotVerified from '#ioc/errors/CustomerNotVerified'
import useLocalePath from '#ioc/composables/useLocalePath'
import useRouter from '#ioc/composables/useRouter'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t } = useI18n()
  const localePath = useLocalePath()
  const router = useRouter()

  return (error: any) => {
    if (error instanceof CustomerNotVerified) {
      router.push(localePath('sign-in'))
      showErrorNotification(t('errors.customerNotVerified'))
    } else {
      throw error
    }
  }
}
