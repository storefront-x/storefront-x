import IS_SERVER from '#ioc/config/IS_SERVER'
import supportsWebp from '#ioc/utils/dom/supportsWebp'
import resizeImage from '#ioc/utils/url/resizeImage'
import { computed, reactive } from 'vue'

export default (el: HTMLElement) => {
  const background = computed(() => {
    return getBackgroundStyles(el)
  })

  const backgroundImages = computed(() => {
    return getBackgroundImages(el)
  })

  const advanced = computed(() => {
    return getAdvanced(el)
  })

  const getTagName = (node: HTMLElement | null) => {
    return node?.tagName
  }

  const getTextContent = (node: HTMLElement | null) => {
    return node?.textContent
  }

  const getInnerHtml = (node: HTMLElement | null) => {
    return node?.innerHTML
  }

  const getAppearance = (node: HTMLElement) => {
    return node.getAttribute('data-appearance')
  }

  const getImageFormat = () => {
    return IS_SERVER || supportsWebp() ? 'webp' : 'jpeg'
  }

  const getImagesStructure = (node: HTMLElement | null) => {
    const images = node?.getAttribute('data-background-images')
    if (images) {
      return JSON.parse(images.replace(/\\"/g, '"'))
    } else {
      return null
    }
  }

  const getBackgroundStyles = (node: HTMLElement | null) => {
    const response: any = {}

    const backgroundColor = node?.style.backgroundColor
    if (backgroundColor) response.backgroundColor = backgroundColor

    const images = getImagesStructure(node)
    if (images) {
      response.backgroundSize = node?.style.backgroundSize
      response.backgroundPosition = node?.style.backgroundPosition
      response.backgroundAttachment = node?.style.backgroundAttachment
      response.backgroundRepeat = node?.style.backgroundRepeat
    }
    return response
  }

  const getBackgroundImages = (node: HTMLElement | null) => {
    const response: any = {}
    const images = getImagesStructure(node)

    if (images) {
      response.backgroundImageDesktop = `url(${resizeImage({
        path: images.desktop_image,
        format: getImageFormat(),
      })})`

      response.backgroundImageMobile = `url(${resizeImage({
        path: images.mobile_image ?? images.desktop_image,
        format: getImageFormat(),
      })})`
    }
    return response
  }

  const getAdvanced = (node: HTMLElement | null) => {
    return {
      ...getTextAlign(node),
      ...getBorder(node),
      ...getMargin(node),
      ...getPadding(node),
    }
  }

  const getTextAlign = (node: HTMLElement | null) => {
    const textAlign = node?.style?.textAlign

    return Object.assign({}, textAlign && { textAlign })
  }

  const getBorder = (node: HTMLElement | null) => {
    const borderStyle = node?.style?.borderStyle
    const borderColor = node?.style?.borderColor
    const borderWidth = node?.style?.borderWidth
    const borderRadius = node?.style?.borderRadius

    if (borderStyle === 'none') return {}

    return Object.assign(
      {},
      borderStyle && { borderStyle },
      borderColor && { borderColor },
      borderWidth && { borderWidth },
      borderRadius && { borderRadius },
    )
  }

  const getMargin = (node: HTMLElement | null) => {
    const marginTop = node?.style?.marginTop
    const marginRight = node?.style?.marginRight
    const marginBottom = node?.style?.marginBottom
    const marginLeft = node?.style?.marginLeft

    return Object.assign(
      {},
      parseFloat(marginTop ?? '') && { marginTop },
      parseFloat(marginRight ?? '') && { marginRight },
      parseFloat(marginBottom ?? '') && { marginBottom },
      parseFloat(marginLeft ?? '') && { marginLeft },
    )
  }

  const getPadding = (node: HTMLElement | null) => {
    const paddingTop = node?.style?.paddingTop
    const paddingRight = node?.style?.paddingRight
    const paddingBottom = node?.style?.paddingBottom
    const paddingLeft = node?.style?.paddingLeft

    return Object.assign(
      {},
      parseFloat(paddingTop ?? '') && { paddingTop },
      parseFloat(paddingRight ?? '') && { paddingRight },
      parseFloat(paddingBottom ?? '') && { paddingBottom },
      parseFloat(paddingLeft ?? '') && { paddingLeft },
    )
  }

  return reactive({
    advanced,
    background,
    backgroundImages,
    getTagName,
    getTextContent,
    getInnerHtml,
    getBackgroundStyles,
    getBackgroundImages,
    getAppearance,
    getAdvanced,
    getPadding,
    getMargin,
    getBorder,
    getTextAlign,
  })
}
