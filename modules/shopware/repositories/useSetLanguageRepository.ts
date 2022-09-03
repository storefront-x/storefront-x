import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (
    languageId: string,
  ): Promise<{
    token: string
  }> => {
    const { contextToken } = await shopware.patch('/context', {
      languageId: languageId,
    })

    return {
      token: contextToken,
    }
  }
}
