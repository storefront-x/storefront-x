import consola from 'consola'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import MagentoError from '#ioc/errors/MagentoError'

const logger = consola.withTag('magento')

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t, te } = useI18n()

  return function handleMagentoError(error: any) {
    if (error instanceof MagentoError) {
      logger.error(error)

      showErrorNotification({
        name: t('errors.title'),
        message: te(`errors["${error.message}"]`) ? t(`errors["${error.message}"]`) : error.message,
      })
    } else {
      throw error
    }
  }
}
