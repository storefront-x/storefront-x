import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (email: string, emailConfirmation: string, password: string) => {
    await shopware.post('/account/change-email', {
      email: email,
      emailConfirmation: emailConfirmation,
      password: password,
    })

    return {
      _success: true,
    }
  }
}
