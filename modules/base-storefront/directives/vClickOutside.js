export default {
  mounted(el, binding) {
    const handler = (event) => {
      if (el === event.target) return
      if (el.contains(event.target)) return

      binding.value(event)
    }

    el.__vueClickOutsideHandler__ = handler

    document.addEventListener('click', handler)
  },

  unmounted(el) {
    document.removeEventListener('click', el.__vueClickOutsideHandler__)
  },
}
