export default {
  computed: {
    width() {
      const width = parseFloat(this.el.style.width)

      if (isNaN(width)) return 0

      return width / 100
    },

    alignSelf() {
      return this.el.style.alignSelf || undefined
    },

    minHeight() {
      return this.el.style.minHeight || undefined
    },

    justifyContent() {
      return this.el.style.justifyContent || undefined
    },
  },
}
