import useShopware from '#ioc/composables/useShopware'
import ToSalutation from '#ioc/mappers/ToSalutation'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    salutations: ReturnType<typeof ToSalutation>[]
  }> => {
    const { elements }: any = await shopware.get('/salutation')

    return {
      salutations: elements.map(ToSalutation),
    }
  }
}
