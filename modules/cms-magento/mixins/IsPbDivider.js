export default {
  computed: {
    color() {
      return this._lineElement.style.borderColor
    },

    thickness() {
      return this._lineElement.style.borderWidth
    },

    width() {
      return this._lineElement.style.width
    },

    _lineElement() {
      return this.el.querySelector('[data-element=line]')
    },
  },
}
