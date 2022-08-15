import useGetLandingPageRepository from '#ioc/repositories/useGetLandingPageRepository'

export default () => {
  const getLandingPage = useGetLandingPageRepository()

  return async (...args: Parameters<typeof getLandingPage>) => {
    return await getLandingPage(...args)
  }
}
