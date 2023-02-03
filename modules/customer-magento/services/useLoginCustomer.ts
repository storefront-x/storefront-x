import useCustomerToken from '#ioc/composables/useCustomerToken'
import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'

interface Options {
  redirect?: string
}

export default () => {
  const loginCustomerRepository = useLoginCustomerRepository()
  const customerToken = useCustomerToken()

  return async (email: string, password: string, options: Options = {}) => {
    const { token } = await loginCustomerRepository(email, password)

    customerToken.set(token)

    if (options.redirect) {
      window.location.href = options.redirect
    } else {
      window.location.reload()
    }
  }
}
