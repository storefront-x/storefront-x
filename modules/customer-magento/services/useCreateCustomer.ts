import useCreateCustomerRepository from '#ioc/repositories/useCreateCustomerRepository'
import useLocalePath from '#ioc/composables/useLocalePath'

interface Options {
  redirect?: boolean
}

export default () => {
  const localePath = useLocalePath()
  const createCustomerRepository = useCreateCustomerRepository()

  return async (data: Parameters<typeof createCustomerRepository>[0], { redirect = true }: Options = {}) => {
    const { _error } = await createCustomerRepository(data)

    if (_error) throw _error

    if (redirect) {
      window.location.href = localePath('sign-in').fullPath
    }
  }
}
