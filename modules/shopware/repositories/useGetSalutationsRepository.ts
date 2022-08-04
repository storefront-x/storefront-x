import useShopware from '#ioc/composables/useShopware'
import useToSalutations from '#ioc/mappers/useToSalutations'

export default () => {
  const shopware = useShopware()
  const toSalutations = useToSalutations()

  return async (): Promise<{
    salutations: ReturnType<typeof toSalutations>[]
  }> => {
    const { elements }: any = await shopware.get('/salutation')

    return {
      salutations: elements.map(toSalutations),
    }
  }
}
