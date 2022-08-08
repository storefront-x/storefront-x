import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import MAGENTO_GQL_ENDPOINT from '#ioc/config/MAGENTO_GQL_ENDPOINT'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default createProxyMiddleware({
  target: MAGENTO_URL,
  changeOrigin: true,
  pathRewrite: {
    '/_magento': MAGENTO_GQL_ENDPOINT,
  },
  logLevel: process.env.NODE_ENV === 'test' ? 'silent' : undefined,
})
