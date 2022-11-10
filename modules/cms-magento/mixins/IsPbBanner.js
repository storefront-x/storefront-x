import UsesIntersectionObserver from '#ioc/mixins/UsesIntersectionObserver'

export default {
  mixins: [UsesIntersectionObserver],

  props: {
    index: {
      type: Number,
      default: -1,
    },
  },

  data() {
    return {
      isVisible: this.index === 0,
    }
  },

  computed: {
    appearance() {
      return this.getAppearance(this.el)
    },

    minHeight() {
      if (this.appearance === 'poster') return this._overlayElement.style.minHeight
      // collage-left
      // collage-centered
      // collage-right
      return this._wrapperElement.style.minHeight
    },

    content() {
      return this.getInnerHtml(this._contentElement)
    },

    link() {
      return this._linkElement?.getAttribute('href')
    },

    showButton() {
      return this.el.getAttribute('data-show-button')
    },

    buttonText() {
      return this.getTextContent(this._buttonElement)
    },

    showOverlay() {
      return this.el.getAttribute('data-show-overlay')
    },

    background() {
      if (!this.isVisible) return {}

      const background = this.getBackground(this._wrapperElement)

      return {
        ...background,
        backgroundImage: this.isVisible ? background.backgroundImage : '',
      }
    },

    mobileBackground() {
      if (!this.isVisible) return {}

      const background = this.getBackground(this._wrapperElement, { mobileImage: true })

      return {
        ...background,
        backgroundImage: this.isVisible ? background.backgroundImage : '',
      }
    },

    advanced() {
      return {
        ...this._getPadding(this.el),
        ...this._getMargin(this.el),
        ...this._getBorder(this._wrapperElement),
        ...this._getTextAlign(this._wrapperElement),
      }
    },

    _wrapperElement() {
      return this.el.querySelector('[data-element="wrapper"]')
    },

    _contentElement() {
      return this.el.querySelector('[data-element="content"]')
    },

    _overlayElement() {
      return this.el.querySelector('[data-element="overlay"]')
    },

    _linkElement() {
      return this.el.querySelector('a[data-element="link"]')
    },

    _buttonElement() {
      return this.el.querySelector('[data-element="button"]')
    },
  },

  methods: {
    onIntersectionObserved() {
      this.isVisible = true
    },
  },
}
