import SHOPWARE_ACCESS_KEY from '#ioc/config/SHOPWARE_ACCESS_KEY'
import SHOPWARE_URL from '#ioc/config/SHOPWARE_URL'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default createProxyMiddleware({
  target: SHOPWARE_URL,
  changeOrigin: true,
  pathRewrite: {
    '/_shopware': '',
  },
  onProxyReq(proxyReq) {
    proxyReq.setHeader('sw-access-key', SHOPWARE_ACCESS_KEY)
  },
})
