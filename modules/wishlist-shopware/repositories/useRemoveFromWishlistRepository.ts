import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (id: string) => {
    const response = await shopware.del(`/customer/wishlist/delete/${id}`)

    if (!response.success) throw new Error()
  }
}
