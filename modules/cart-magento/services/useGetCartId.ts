import useCartToken from '#ioc/composables/useCartToken'

export default () => {
  const cartToken = useCartToken()

  return async (): Promise<{
    id: string | null
  }> => {
    const id = cartToken.get()

    return {
      id,
    }
  }
}
