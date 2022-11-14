import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (id: number) => {
    const response = await shopware.post(`/customer/wishlist/add/${id}`)

    if (!response.success) throw new Error()
  }
}
