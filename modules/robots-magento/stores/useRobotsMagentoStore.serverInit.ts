import useGetRobots from '#ioc/services/useGetRobots'
import useRobotsStore from '#ioc/stores/useRobotsStore'

export default () => {
  const robotsStore = useRobotsStore()

  const getRobots = useGetRobots()

  return async () => {
    const { content } = await getRobots()

    robotsStore.$patch({ content })
  }
}
