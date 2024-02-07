import getRuntimeConfigValue from '#ioc/utils/getRuntimeConfigValue'

export default getRuntimeConfigValue('MAGENTO_URL') ?? 'https://vanilla-demo-new.magexo.cloud'
