import { RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.params.savePosition) return
  if (to.hash) return { el: to.hash, behavior: 'smooth' }

  return { top: 0, behavior: 'smooth' }
}

export default scrollBehavior
