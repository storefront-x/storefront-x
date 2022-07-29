import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    token: string
  }> => {
    const response = await shopware.post('/account/logout')

    return {
      token: response.contextToken,
    }
  }
}
