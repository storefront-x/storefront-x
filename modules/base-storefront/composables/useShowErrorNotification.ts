import useShowNotification from '#ioc/composables/useShowNotification'

export default () => {
  const showNotification = useShowNotification()

  return async (err: any) => {
    showNotification(err.name, err.message, 'ERROR')
  }
}
