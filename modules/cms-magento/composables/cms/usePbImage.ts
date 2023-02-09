import { computed, reactive } from 'vue'

export default (el: HTMLElement) => {
  const src = computed(() => {
    return desktopImageElement.value?.getAttribute('src')
  })

  const alt = computed(() => {
    return desktopImageElement.value?.getAttribute('alt')
  })

  const title = computed(() => {
    return desktopImageElement.value?.getAttribute('title')
  })

  const link = computed(() => {
    return desktopImageElement.value?.getAttribute('href')
  })

  const caption = computed(() => {
    return captionElement.value?.textContent
  })

  const openInNewTab = computed(() => {
    return desktopImageElement.value?.getAttribute('target') === '_blank'
  })

  const desktopImageElement = computed(() => {
    return el.querySelector('[data-element=desktop_image]')
  })

  const captionElement = computed(() => {
    return el.querySelector('[data-element=caption]')
  })

  return reactive({
    src,
    alt,
    title,
    link,
    caption,
    openInNewTab,
    desktopImageElement,
    captionElement,
  })
}
