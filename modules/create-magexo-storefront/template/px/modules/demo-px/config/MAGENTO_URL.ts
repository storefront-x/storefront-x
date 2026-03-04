import getRuntimeConfigValue from '#ioc/utils/getRuntimeConfigValue'

export default getRuntimeConfigValue('MAGENTO_URL') ?? 'https://core-demo-sfx-new.magexo.cloud'
