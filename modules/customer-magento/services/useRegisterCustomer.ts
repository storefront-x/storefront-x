import useRegisterCustomerRepository from '#ioc/repositories/useRegisterCustomerRepository'
import useLocalePath from '#ioc/composables/useLocalePath'
import useRouter from '#ioc/composables/useRouter'

interface Options {
  redirect?: boolean
}

export default () => {
  const localePath = useLocalePath()
  const router = useRouter()
  const registerCustomerRepository = useRegisterCustomerRepository()

  return async (data: Parameters<typeof registerCustomerRepository>[0], { redirect = true }: Options = {}) => {
    await registerCustomerRepository(data)

    if (redirect) {
      router.push(localePath('sign-in'))
    }
  }
}
