import useMagento from '#ioc/composables/useMagento'
import GetRobots from '#ioc/graphql/queries/GetRobots'

export default () => {
  const magento = useMagento()

  return async (): Promise<{
    content: string
  }> => {
    const {
      data: { storeConfig },
    } = await magento.graphql(GetRobots())

    return {
      content: storeConfig.design_search_engine_robots_default_robots,
    }
  }
}
