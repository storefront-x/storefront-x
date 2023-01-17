import useGetRobots from '#ioc/services/useGetRobots'
import useRobotsStore from '#ioc/stores/useRobotsStore'

export default async () => {
  const robotsStore = useRobotsStore()

  const getRobots = useGetRobots()

  const { content } = await getRobots()

  robotsStore.$patch({ content })
}
