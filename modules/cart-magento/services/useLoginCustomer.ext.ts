import useCartToken from '#ioc/composables/useCartToken'

export default (useLoginCustomer: any) => () => {
  const cartToken = useCartToken()
  const loginCustomer = useLoginCustomer()

  return async (...args: any) => {
    await loginCustomer(...args)

    cartToken.remove()
  }
}
