import useIntersectionObserver from '#ioc/composables/useIntersectionObserver'
import { computed, reactive, ref } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: any, index = -1) => {
  const pbBlock = usePbBlock(el)

  const isVisible = ref(index === 0)

  const appearance = computed(() => {
    return pbBlock.getAppearance(el)
  })

  const minHeight = computed(() => {
    if (appearance.value === 'poster') return _overlayElement.value.style.minHeight
    // collage-left
    // collage-centered
    // collage-right
    return _wrapperElement.value.style.minHeight
  })

  const content = computed(() => {
    return pbBlock.getInnerHtml(_contentElement.value)
  })

  const link = computed(() => {
    return _linkElement.value?.getAttribute('href')
  })

  const showButton = computed(() => {
    return el.getAttribute('data-show-button')
  })

  const buttonText = computed(() => {
    return pbBlock.getTextContent(_buttonElement.value)
  })

  const showOverlay = computed(() => {
    return el.getAttribute('data-show-overlay')
  })

  const background = computed(() => {
    if (!isVisible.value) return {}

    const background = pbBlock.getBackground(_wrapperElement.value)

    return {
      ...background,
      backgroundImage: isVisible.value ? background.backgroundImage : '',
    }
  })

  const mobileBackground = computed(() => {
    if (!isVisible.value) return {}

    const background = pbBlock.getBackground(_wrapperElement.value)

    return {
      ...background,
      backgroundImage: isVisible.value ? background.backgroundImage : '',
    }
  })

  const advanced = computed(() => {
    return {
      ...pbBlock._getPadding(el),
      ...pbBlock._getMargin(el),
      ...pbBlock._getBorder(_wrapperElement.value),
      ...pbBlock._getTextAlign(_wrapperElement.value),
    }
  })

  const _wrapperElement = computed(() => {
    return el.querySelector('[data-element="wrapper"]')
  })

  const _contentElement = computed(() => {
    return el.querySelector('[data-element="content"]')
  })

  const _overlayElement = computed(() => {
    return el.querySelector('[data-element="overlay"]')
  })

  const _linkElement = computed(() => {
    return el.querySelector('a[data-element="link"]')
  })

  const _buttonElement = computed(() => {
    return el.querySelector('[data-element="button"]')
  })

  useIntersectionObserver(el, ([{ isIntersecting }]) => {
    isVisible.value = isIntersecting
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
  })
}
