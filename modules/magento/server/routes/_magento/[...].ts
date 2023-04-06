import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import { eventHandler, proxyRequest } from 'h3'

export default eventHandler((event) => {
  const path = event.path?.replace(/^\/_magento/, '') ?? '/'

  return proxyRequest(event, MAGENTO_URL + path)
})
