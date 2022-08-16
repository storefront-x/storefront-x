export default {
  computed: {
    content() {
      return this.getTextContent(this.el)
    },

    link() {
      if (!this._linkElement) return '#'

      return this._linkElement.getAttribute('href')
    },

    type() {
      if (this._linkElement.classList.contains('pagebuilder-button-primary')) {
        return 'primary'
      } else if (this._linkElement.classList.contains('pagebuilder-button-secondary')) {
        return 'secondary'
      } else if (this._linkElement.classList.contains('pagebuilder-button-link')) {
        return 'link'
      } else {
        return undefined
      }
    },

    _linkElement() {
      return this.el.querySelector('[data-element="link"]') ?? this.el.querySelector('[data-element="empty_link"]')
    },
  },
}
