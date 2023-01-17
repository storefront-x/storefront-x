import useCartTokenIdent from '#ioc/composables/useCartTokenIdent'

export default (useLoginCustomer: any) => {
  const cartTokenIdent = useCartTokenIdent()

  return () => {
    const loginCustomer = useLoginCustomer()

    return async (...args: any) => {
      await loginCustomer(...args)

      localStorage.removeItem(cartTokenIdent)
    }
  }
}
