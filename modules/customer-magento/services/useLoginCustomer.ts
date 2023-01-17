import useCustomerTokenIdent from '#ioc/composables/useCustomerTokenIdent'
import useLoginCustomerRepository from '#ioc/repositories/useLoginCustomerRepository'

interface Options {
  redirect?: string
}

export default () => {
  const loginCustomerRepository = useLoginCustomerRepository()
  const customerTokenIdent = useCustomerTokenIdent()

  return async (email: string, password: string, options: Options = {}) => {
    const { token } = await loginCustomerRepository(email, password)

    localStorage.setItem(customerTokenIdent, token)

    if (options.redirect) {
      window.location.href = options.redirect
    } else {
      window.location.reload()
    }
  }
}
