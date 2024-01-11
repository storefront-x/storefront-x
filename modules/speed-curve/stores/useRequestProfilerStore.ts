import defineStore from '#ioc/utils/vuePinia/defineStore'

export default defineStore('requestProfiler', {
  state: () => ({
    requests: new Map(),
  }),
  share: {
    enable: false,
  },
})
