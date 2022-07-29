import useShopware from '#ioc/composables/useShopware'

export default () => {
  const shopware = useShopware()

  return async () => {
    const { elements }: any = await shopware.get('/salutation')

    return {
      salutationId: elements[0].id as string,
    }
  }
}
