export default {
  computed: {
    minHeight() {
      return this.el.style.minHeight || undefined
    },

    justifyContent() {
      return this.el.style.justifyContent || undefined
    },

    background() {
      return this.getBackground(this._innerElement)
    },

    advanced() {
      return this.getAdvanced(this._innerElement)
    },

    _innerElement() {
      return this.appearance === 'contained' ? this.el.querySelector('[data-element="inner"]') : this.el
    },

    appearance() {
      return this.getAppearance(this.el)
    },
  },
}
