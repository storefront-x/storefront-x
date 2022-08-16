import IS_SERVER from '#ioc/config/IS_SERVER'
import supportsWebp from '#ioc/utils/dom/supportsWebp'
import resizeImage from '#ioc/utils/url/resizeImage'

export default {
  props: {
    el: {
      type: null,
      default: null,
    },
  },

  computed: {
    background() {
      return this.getBackground(this.el)
    },

    advanced() {
      return this.getAdvanced(this.el)
    },
  },

  methods: {
    getTagName(node) {
      return node.tagName
    },

    getTextContent(node) {
      return node.textContent
    },

    getInnerHtml(node) {
      return node.innerHTML
    },

    getAppearance(node) {
      return node.getAttribute('data-appearance')
    },

    getBackground(node) {
      const response = {}

      const backgroundColor = node.style.backgroundColor
      if (backgroundColor) response.backgroundColor = backgroundColor

      const images = node.getAttribute('data-background-images')
      if (images) {
        const imagesStructure = JSON.parse(images.replace(/\\"/g, '"'))
        const format = IS_SERVER || supportsWebp() ? 'webp' : 'jpeg'

        // TODO: Support for mobile images
        if (imagesStructure.desktop_image) {
          response.backgroundImage = `url(${resizeImage({ path: imagesStructure.desktop_image, format })})`
          response.backgroundSize = node.style.backgroundSize
          response.backgroundPosition = node.style.backgroundPosition
          response.backgroundAttachment = node.style.backgroundAttachment
          response.backgroundRepeat = node.style.backgroundRepeat
        }
      }

      return response
    },

    getAdvanced(node) {
      return {
        ...this._getTextAlign(node),
        ...this._getBorder(node),
        ...this._getMargin(node),
        ...this._getPadding(node),
      }
    },

    _getTextAlign(node) {
      const textAlign = node.style.textAlign

      return Object.assign({}, textAlign && { textAlign })
    },

    _getBorder(node) {
      const borderStyle = node.style.borderStyle
      const borderColor = node.style.borderColor
      const borderWidth = node.style.borderWidth
      const borderRadius = node.style.borderRadius

      if (borderStyle === 'none') return {}

      return Object.assign(
        {},
        borderStyle && { borderStyle },
        borderColor && { borderColor },
        borderWidth && { borderWidth },
        borderRadius && { borderRadius },
      )
    },

    _getMargin(node) {
      const marginTop = node.style.marginTop
      const marginRight = node.style.marginRight
      const marginBottom = node.style.marginBottom
      const marginLeft = node.style.marginLeft

      return Object.assign(
        {},
        parseFloat(marginTop) && { marginTop },
        parseFloat(marginRight) && { marginRight },
        parseFloat(marginBottom) && { marginBottom },
        parseFloat(marginLeft) && { marginLeft },
      )
    },

    _getPadding(node) {
      const paddingTop = node.style.paddingTop
      const paddingRight = node.style.paddingRight
      const paddingBottom = node.style.paddingBottom
      const paddingLeft = node.style.paddingLeft

      return Object.assign(
        {},
        parseFloat(paddingTop) && { paddingTop },
        parseFloat(paddingRight) && { paddingRight },
        parseFloat(paddingBottom) && { paddingBottom },
        parseFloat(paddingLeft) && { paddingLeft },
      )
    },
  },
}
