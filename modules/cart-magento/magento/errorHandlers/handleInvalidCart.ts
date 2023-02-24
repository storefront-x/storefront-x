import CartResetted from '#ioc/errors/CartResetted'

export default () => {
  const errorMessages = ['Could not find a cart with ID', `The cart isn't active`]

  return async (error: any) => {
    for (const message of errorMessages) {
      if (error.message?.includes(message)) {
        throw new CartResetted()
      }
    }
  }
}
