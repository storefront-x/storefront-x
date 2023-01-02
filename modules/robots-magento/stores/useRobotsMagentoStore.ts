import IS_CLIENT from '#ioc/config/IS_CLIENT'
import useGetRobots from '#ioc/services/useGetRobots'
import defineStore from '#ioc/utils/vuePinia/defineStore'
import useRobotsStore from '#ioc/stores/useRobotsStore'

export default defineStore('robotsMagento', {
  actions: {
    async serverInit() {
      if (IS_CLIENT) return

      const robotsStore = useRobotsStore()

      const getRobots = useGetRobots()

      const { content } = await getRobots()

      robotsStore.$patch({ content })
    },
  },
})
