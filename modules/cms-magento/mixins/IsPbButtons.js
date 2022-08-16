export default {
  computed: {
    appearance() {
      return this.getAppearance(this.el)
    },

    sameWidth() {
      return this.el.getAttribute('data-same-width') === 'true'
    },
  },
}
