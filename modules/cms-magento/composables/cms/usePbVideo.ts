import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: any) => {
  const pbBlock = usePbBlock(el)

  const advanced = computed(() => {
    return {
      ...pbBlock.getAdvanced(el),
      ...pbBlock.getAdvanced(_wrapperNode.value),
    }
  })

  const src = computed(() => {
    return _videoNode.value.getAttribute('src')
  })

  const autoplay = computed(() => {
    return _videoNode.value.getAttribute('autoplay') === 'true'
  })

  const muted = computed(() => {
    return _videoNode.value.getAttribute('muted') === 'true'
  })

  const _wrapperNode = computed(() => {
    return el.querySelector('[data-element=wrapper]')
  })

  const _videoNode = computed(() => {
    return el.querySelector('[data-element=video]')
  })

  return reactive({
    advanced,
    src,
    autoplay,
    muted,
  })
}
