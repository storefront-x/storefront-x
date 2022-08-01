import useShowNotification from '#ioc/composables/useShowNotification'

export default () => {
  const showNotification = useShowNotification()

  return async (title: string, message: string) => {
    showNotification(title, message, 'SUCCESS')
  }
}
