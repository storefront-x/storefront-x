export default {
  computed: {
    headingType() {
      return this.getTagName(this.el)
    },

    headingText() {
      return this.getTextContent(this.el)
    },
  },
}
