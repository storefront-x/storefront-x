import { computed, reactive, Ref } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: Ref<HTMLElement>, isVisible: Ref<boolean>) => {
  const pbBlock = usePbBlock(el.value)

  const appearance = computed(() => {
    return pbBlock.getAppearance(el.value)
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
    return el.value.getAttribute('data-show-button')
  })

  const buttonText = computed(() => {
    return pbBlock.getTextContent(buttonElement.value)
  })

  const showOverlay = computed(() => {
    return el.value.getAttribute('data-show-overlay')
  })

  const background = computed(() => {
    if (!isVisible.value) return {}

    const background = pbBlock.getBackground(wrapperElement.value)

    return {
      ...background,
      backgroundImage: isVisible.value ? background.backgroundImage : '',
    }
  })

  const mobileBackground = computed(() => {
    if (!isVisible.value) return {}

    const background = pbBlock.getBackground(wrapperElement.value)

    return {
      ...background,
      backgroundImage: isVisible.value ? background.backgroundImage : '',
    }
  })

  const advanced = computed(() => {
    return {
      ...pbBlock.getPadding(el.value),
      ...pbBlock.getMargin(el.value),
      ...pbBlock.getBorder(wrapperElement.value),
      ...pbBlock.getTextAlign(wrapperElement.value),
    }
  })

  const wrapperElement = computed(() => {
    return el.value.querySelector<HTMLElement>('[data-element="wrapper"]')
  })

  const contentElement = computed(() => {
    return el.value.querySelector<HTMLElement>('[data-element="content"]')
  })

  const overlayElement = computed(() => {
    return el.value.querySelector<HTMLElement>('[data-element="overlay"]')
  })

  const linkElement = computed(() => {
    return el.value.querySelector<HTMLElement>('a[data-element="link"]')
  })

  const buttonElement = computed(() => {
    return el.value.querySelector<HTMLElement>('[data-element="button"]')
  })

  return reactive({
    appearance,
    background,
    minHeight,
    advanced,
    content,
    link,
    showButton,
    buttonText,
    showOverlay,
    mobileBackground,
    wrapperElement,
    contentElement,
    overlayElement,
    linkElement,
    buttonElement,
  })
}
