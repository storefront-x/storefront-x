import useContext from '#ioc/composables/useContext'
import IS_SERVER from '#ioc/config/IS_SERVER'
import consola from 'consola'

export default () => {
  const ctx = useContext()

  return async (_: Response, request: Request, name: string) => {
    const logger = consola.withTag('Request logs')
    const endTime = Date.now()
    const totalTime = endTime - ctx.startTime

    const argv = process.argv

    if (IS_SERVER && argv.includes('--profileSSR')) {
      logger.info({
        name: name,
        duration: totalTime + ' ms',
        url: request.url,
        startedTime: new Date(ctx.startTime).toLocaleTimeString(),
      })
    }
  }
}
