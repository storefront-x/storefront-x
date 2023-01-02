import useShowErrorNotification from '#ioc/composables/useShowErrorNotification'
import useI18n from '#ioc/composables/useI18n'
import GraphQLError from '#ioc/errors/GraphQLError'

export default function useHandleGraphQLError() {
  const showErrorNotification = useShowErrorNotification()
  const { t, te } = useI18n()

  return function handleGraphQLError(error: any) {
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
