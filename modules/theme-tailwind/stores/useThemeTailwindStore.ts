import { defineStore } from 'pinia'

export default defineStore('themeTailwind', {
  state: () => ({
    isHamburgerOpened: false,
  }),
})
