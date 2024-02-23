import getRuntimeConfigValue from '#ioc/utils/getRuntimeConfigValue'

export default getRuntimeConfigValue('MAGENTO_URL') ?? 'https://czub-be-themes.magexo.cloud'
