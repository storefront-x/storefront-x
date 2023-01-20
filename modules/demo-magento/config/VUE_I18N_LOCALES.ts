import Locale from '#ioc/types/vue-i18n/Locale'

export default [
  {
    fullName: 'English',
    name: 'en',
    locale: 'en-US',
    prefix: '/',
    flag: '/flags/1x1/us.svg',
    magentoStore: 'default',
  },
  {
    fullName: 'Czech',
    name: 'cz',
    locale: 'cs-CZ',
    prefix: '/cz',
    flag: '/flags/1x1/cz.svg',
    magentoStore: 'b2c_cz',
  },
] as Locale[]
