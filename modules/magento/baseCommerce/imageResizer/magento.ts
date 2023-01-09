import MAGENTO_URL from '#ioc/config/MAGENTO_URL'

export default {
  processPath: (path: string) => path.replace(/^magento::/, MAGENTO_URL),
}
