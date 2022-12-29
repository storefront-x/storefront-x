import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const {t} = useI18n()

  return (error: any) => {
    showErrorNotification({
      name: t('errors.title'),
      message: t(`errors["${error.message}"]`).startsWith('errors') ? error.message : t(`errors["${error.message}"]`),
    })
  }
}
