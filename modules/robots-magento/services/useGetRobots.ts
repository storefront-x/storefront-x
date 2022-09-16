import useGetRobotsRepository from '#ioc/repositories/useGetRobotsRepository'

export default () => {
  const getRobotsRepository = useGetRobotsRepository()

  return async (...args: Parameters<typeof getRobotsRepository>) => {
    return await getRobotsRepository(...args)
  }
}
