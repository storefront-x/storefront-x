import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('themeTailwind', {
  state: () => ({
    isHamburgerOpened: false,
  }),
})
