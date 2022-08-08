import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (
    id: string,
  ): Promise<{
    _success: boolean
  }> => {
    await shopware.del(`/account/address/${id}`)

    return {
      _success: true,
    }
  }
}
