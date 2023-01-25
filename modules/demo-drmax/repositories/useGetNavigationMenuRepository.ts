import ToCategoryElastic from '#ioc/mappers/ToCategoryElastic'
import Query from '#ioc/utils/elasticSearch/Query'

export default () => {
  return async (): Promise<{
    categories: ReturnType<typeof ToCategoryElastic>[]
  }> => {
    const data = await Query.megaMenus().get()
    const mainMenu = data.find((d) => d.key === 'main-menu')

    return {
      categories: mainMenu.items.map(ToCategoryElastic),
    }
  }
}
