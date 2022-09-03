import useShopware from '#ioc/composables/useShopware'
import ToCategory from '#ioc/mappers/ToCategory'

export default () => {
  const shopware = useShopware()

  return async (): Promise<{
    categories: ReturnType<typeof ToCategory>[]
  }> => {
    const response = await shopware.post('/navigation/main-navigation/main-navigation')

    return {
      categories: response.map(ToCategory),
    }
  }
}
