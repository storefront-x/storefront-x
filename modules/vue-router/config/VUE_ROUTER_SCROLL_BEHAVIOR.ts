import { RouterScrollBehavior } from 'vue-router'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  if (to.params.savePosition) {
    // For some reason vue-router maintains params between pushes.
    // By removing savePosition from params, we prevent subsequent pushes from scrolling to the top of the page.
    delete to.params.savePosition
    return false
  }

  if (to.hash) {
    return { el: to.hash, behavior: 'smooth' }
  }

  return { top: 0, behavior: 'smooth' }
}

export default scrollBehavior
