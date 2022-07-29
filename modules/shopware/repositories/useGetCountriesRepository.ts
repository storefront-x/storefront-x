import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async () => {
    const { elements }: any = await shopware.get('/country')

    return {
      countryId: elements[0].id as string,
    }
  }
}
