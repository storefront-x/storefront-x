import ELASTIC_URL from '#ioc/config/ELASTIC_URL'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default createProxyMiddleware({
  target: ELASTIC_URL,
  changeOrigin: true,
  pathRewrite: {
    '/_magento': '_gql',
  },
  logLevel: process.env.NODE_ENV === 'test' ? 'silent' : undefined,
})
