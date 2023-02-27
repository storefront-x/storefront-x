import CartResetted from '#ioc/errors/CartResetted'
import isInvalidCart from '#ioc/utils/graphql/isInvalidCart'

export default () => {
  return async (error: any) => {
    if (isInvalidCart(error)) {
      throw new CartResetted(error.message)
    }
  }
}
