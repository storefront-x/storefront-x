import useCartItemPath from '#ioc/services/useCartItemPath'

export default () => {
  const cartItemPath = useCartItemPath()

  return async (response: any) => {
    response.lineItems = await Promise.all(
      response.lineItems?.map(async (entry: any) => {
        entry.urlPath = await cartItemPath.getById(entry.referencedId)
        return entry
      }),
    )
    return response
  }
}
