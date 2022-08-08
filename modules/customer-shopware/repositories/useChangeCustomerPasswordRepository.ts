import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (data: {
    password: string
    newPassword: string
    newPasswordConfirm: string
  }): Promise<{
    _success: boolean
  }> => {
    await shopware.post(`/account/change-password`, {
      password: data.password,
      newPassword: data.newPassword,
      newPasswordConfirm: data.newPasswordConfirm,
    })

    return {
      _success: true,
    }
  }
}
