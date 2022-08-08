import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async (data: {
    firstName: string
    lastName: string
    title: string
    salutationId: string
  }): Promise<{
    _success: boolean
  }> => {
    await shopware.post(`/account/change-profile`, {
      salutationId: data.salutationId,
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title,
    })

    return {
      _success: true,
    }
  }
}
