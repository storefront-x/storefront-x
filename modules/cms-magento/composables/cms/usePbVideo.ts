import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: HTMLElement) => {
  const pbBlock = usePbBlock(el)

  const advanced = computed(() => {
    return {
      ...pbBlock.getAdvanced(el),
      ...pbBlock.getAdvanced(wrapperNode.value),
    }
  })

  const src = computed(() => {
    return videoNode.value?.getAttribute('src')
  })

  const autoplay = computed(() => {
    return videoNode.value?.getAttribute('autoplay') === 'true'
  })

  const muted = computed(() => {
    return videoNode.value?.getAttribute('muted') === 'true'
  })

  const wrapperNode = computed(() => {
    return el.querySelector<HTMLElement>('[data-element=wrapper]')
  })

  const videoNode = computed(() => {
    return el.querySelector<HTMLElement>('[data-element=video]')
  })

  return reactive({
    advanced,
    src,
    autoplay,
    muted,
    wrapperNode,
    videoNode,
  })
}
