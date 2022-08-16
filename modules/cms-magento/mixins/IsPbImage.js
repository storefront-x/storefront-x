export default {
  computed: {
    src() {
      return this._desktopImageElement?.getAttribute('src')
    },

    alt() {
      return this._desktopImageElement?.getAttribute('alt')
    },

    title() {
      return this._desktopImageElement?.getAttribute('title')
    },

    link() {
      return this._desktopImageElement?.getAttribute('href')
    },

    caption() {
      return this._captionElement?.textContent
    },

    openInNewTab() {
      return this._desktopImageElement.getAttribute('target') === '_blank'
    },

    _desktopImageElement() {
      return this.el.querySelector('[data-element=desktop_image]')
    },

    _captionElement() {
      return this.el.querySelector('[data-element=caption]')
    },
  },
}
