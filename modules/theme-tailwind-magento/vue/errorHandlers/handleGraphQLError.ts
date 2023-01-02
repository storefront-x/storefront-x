import GraphQLError from '#ioc/errors/GraphQLError'
import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'

export default () => {
  const showErrorNotification = useShowErrorNotification()
  const { t, te } = useI18n()

  return (error: any) => {
    if (error instanceof GraphQLError) {
      showErrorNotification({
        name: t('errors.title'),
        message: te(`errors["${error.message}"]`) ? t(`errors["${error.message}"]`) : error.message,
      })
    } else {
      throw error
    }
  }
}
