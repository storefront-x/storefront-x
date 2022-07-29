import useShopware from '#ioc/composables/useShopware'
import useToCategory from '#ioc/mappers/useToCategory'

export default () => {
  const shopware = useShopware()
  const toCategory = useToCategory()

  return async (): Promise<{
    categories: ReturnType<typeof toCategory>[]
  }> => {
    const response = await shopware.post('/navigation/main-navigation/main-navigation')

    return {
      categories: response.map(toCategory),
    }
  }
}
