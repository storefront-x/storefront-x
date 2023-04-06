import getRuntimeConfigValue from '#ioc/utils/getRuntimeConfigValue'

export default getRuntimeConfigValue('MAGENTO_URL') ?? 'https://be-vanilla.demo.magexo.cloud'
