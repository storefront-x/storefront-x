import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import { eventHandler, proxyRequest } from 'h3'

export default eventHandler((event) => proxyRequest(event, MAGENTO_URL))
