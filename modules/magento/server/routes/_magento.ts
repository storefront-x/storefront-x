import MAGENTO_URL from '#ioc/config/MAGENTO_URL'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default createProxyMiddleware({
  target: MAGENTO_URL,
  changeOrigin: true,
  pathRewrite: {
    '/_magento': '',
  },
  logLevel: process.env.NODE_ENV === 'test' ? 'silent' : undefined,
  secure: false,
})
