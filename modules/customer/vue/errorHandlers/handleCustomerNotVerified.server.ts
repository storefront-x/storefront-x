import CustomerNotVerified from '#ioc/errors/CustomerNotVerified'
import useLocalePath from '#ioc/composables/useLocalePath'
import redirect from '#ioc/utils/redirect'

export default () => {
  const localePath = useLocalePath()

  return (error: any) => {
    if (error instanceof CustomerNotVerified) {
      redirect(localePath('sign-in'), 302)
    } else {
      throw error
    }
  }
}
