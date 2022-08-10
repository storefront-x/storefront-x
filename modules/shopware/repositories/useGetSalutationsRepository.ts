import useShopware from '#ioc/composables/useShopware'
import useToSalutation from '#ioc/mappers/useToSalutation'

export default () => {
  const shopware = useShopware()
  const toSalutation = useToSalutation()

  return async (): Promise<{
    salutations: ReturnType<typeof toSalutation>[]
  }> => {
    const { elements }: any = await shopware.get('/salutation')

    return {
      salutations: elements.map(toSalutation),
    }
  }
}
