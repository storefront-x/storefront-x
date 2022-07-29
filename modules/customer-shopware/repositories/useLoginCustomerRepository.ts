import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (
    email: string,
    password: string,
  ): Promise<{
    token: string
  }> => {
    const response = await shopware.post(`/account/login`, {
      email: email,
      password: password,
    })

    return {
      token: response.contextToken,
    }
  }
}
