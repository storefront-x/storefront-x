import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: HTMLElement) => {
  const pbBlock = usePbBlock(el)

  const appearance = computed(() => {
    return pbBlock.getAppearance(el)
  })

  const minHeight = computed(() => {
    if (appearance.value === 'poster') return overlayElement.value?.style.minHeight
    // collage-left
    // collage-centered
    // collage-right
    return wrapperElement.value?.style.minHeight
  })

  const content = computed(() => {
    return pbBlock.getInnerHtml(contentElement.value)
  })

  const link = computed(() => {
    return linkElement.value?.getAttribute('href')
  })

  const showButton = computed(() => {
    return el.getAttribute('data-show-button')
  })

  const buttonText = computed(() => {
    return pbBlock.getTextContent(buttonElement.value)
  })

  const showOverlay = computed(() => {
    return el.getAttribute('data-show-overlay')
  })

  const backgroundStyles = computed(() => {
    return pbBlock.getBackgroundStyles(wrapperElement.value)
  })

  const backgroundImages = computed(() => {
    return pbBlock.getBackgroundImages(wrapperElement.value)
  })

  const advanced = computed(() => {
    return {
      ...pbBlock.getPadding(el),
      ...pbBlock.getMargin(el),
      ...pbBlock.getBorder(wrapperElement.value),
      ...pbBlock.getTextAlign(wrapperElement.value),
    }
  })

  const wrapperElement = computed(() => {
    return el.querySelector<HTMLElement>('[data-element="wrapper"]')
  })

  const contentElement = computed(() => {
    return el.querySelector<HTMLElement>('[data-element="content"]')
  })

  const overlayElement = computed(() => {
    return el.querySelector<HTMLElement>('[data-element="overlay"]')
  })

  const linkElement = computed(() => {
    return el.querySelector<HTMLElement>('a[data-element="link"]')
  })

  const buttonElement = computed(() => {
    return el.querySelector<HTMLElement>('[data-element="button"]')
  })

  return reactive({
    appearance,
    backgroundStyles,
    backgroundImages,
    minHeight,
    advanced,
    content,
    link,
    showButton,
    buttonText,
    showOverlay,
    wrapperElement,
    contentElement,
    overlayElement,
    linkElement,
    buttonElement,
  })
}
