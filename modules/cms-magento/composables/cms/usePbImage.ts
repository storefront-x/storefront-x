import { computed, reactive } from 'vue'

export default (el: any) => {
  const src = computed(() => {
    return _desktopImageElement.value?.getAttribute('src')
  })

  const alt = computed(() => {
    return _desktopImageElement.value?.getAttribute('alt')
  })

  const title = computed(() => {
    return _desktopImageElement.value?.getAttribute('title')
  })

  const link = computed(() => {
    return _desktopImageElement.value?.getAttribute('href')
  })

  const caption = computed(() => {
    return _captionElement.value?.textContent
  })

  const openInNewTab = computed(() => {
    return _desktopImageElement.value.getAttribute('target') === '_blank'
  })

  const _desktopImageElement = computed(() => {
    return el.querySelector('[data-element=desktop_image]')
  })

  const _captionElement = computed(() => {
    return el.querySelector('[data-element=caption]')
  })

  return reactive({
    src,
    alt,
    title,
    link,
    caption,
    openInNewTab,
  })
}
