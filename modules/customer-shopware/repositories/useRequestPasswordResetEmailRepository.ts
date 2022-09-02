import useShopware from '#ioc/composables/useShopware'
import SHOPWARE_URL from '#ioc/config/SHOPWARE_URL'

export default () => {
  const shopware = useShopware()

  return async (
    email: string,
  ): Promise<{
    success: boolean
  }> => {
    const response = await shopware.post(`/account/recovery-password`, {
      email: email,
      storefrontUrl: SHOPWARE_URL,
    })

    return {
      success: response.success,
    }
  }
}
