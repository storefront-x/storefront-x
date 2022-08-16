export default {
  computed: {
    innerHtml() {
      return this.getInnerHtml(this.el)
    },
  },
}
