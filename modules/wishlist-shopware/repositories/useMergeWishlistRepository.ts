import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (
    ids: string[],
  ): Promise<{
    success: boolean
  }> => {
    const response = await shopware.post(`/customer/wishlist/merge`, {
      productIds: ids,
    })

    return {
      success: !!response,
    }
  }
}
