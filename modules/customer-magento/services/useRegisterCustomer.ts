import useRegisterCustomerRepository from '#ioc/repositories/useRegisterCustomerRepository'
import useLocalePath from '#ioc/composables/useLocalePath'

interface Options {
  redirect?: boolean
}

export default () => {
  const localePath = useLocalePath()
  const registerCustomerRepository = useRegisterCustomerRepository()

  return async (data: Parameters<typeof registerCustomerRepository>[0], { redirect = true }: Options = {}) => {
    await registerCustomerRepository(data)

    if (redirect) {
      window.location.href = localePath('sign-in').fullPath
    }
  }
}
