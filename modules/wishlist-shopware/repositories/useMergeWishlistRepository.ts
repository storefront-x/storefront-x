import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (ids: string[]) => {
    const response = await shopware.post(`/customer/wishlist/merge`, {
      productIds: ids,
    })

    if (!response) throw new Error()
  }
}
