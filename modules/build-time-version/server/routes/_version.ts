import { eventHandler, readBody } from 'h3'
import BUILD_TIME_VERSION from '#ioc/config/BUILD_TIME_VERSION'

export default eventHandler(async (event) => {
  const { version } = await readBody(event)

  if (version !== BUILD_TIME_VERSION) {
    return { reload: true }
  } else {
    return { reload: false }
  }
})
