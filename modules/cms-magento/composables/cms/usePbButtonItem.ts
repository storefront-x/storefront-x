import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: HTMLElement) => {
  const pbBlock = usePbBlock(el)

  const content = computed(() => {
    return pbBlock.getTextContent(el)
  })

  const link = computed(() => {
    if (!linkElement.value) return '#'

    return linkElement.value.getAttribute('href')
  })

  const type = computed(() => {
    if (linkElement.value?.classList.contains('pagebuilder-button-primary')) {
      return 'primary'
    } else if (linkElement.value?.classList.contains('pagebuilder-button-secondary')) {
      return 'secondary'
    } else if (linkElement.value?.classList.contains('pagebuilder-button-link')) {
      return 'link'
    } else {
      return undefined
    }
  })

  const linkElement = computed(() => {
    return el.querySelector('[data-element="link"]') ?? el.querySelector('[data-element="empty_link"]')
  })

  return reactive({
    content,
    link,
    type,
    linkElement,
  })
}
