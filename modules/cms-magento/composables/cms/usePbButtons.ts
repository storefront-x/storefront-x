import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: HTMLElement) => {
  const pbBlock = usePbBlock(el)

  const appearance = computed(() => {
    return pbBlock.getAppearance(el)
  })

  const sameWidth = computed(() => {
    return el.getAttribute('data-same-width') === 'true'
  })

  return reactive({
    appearance,
    sameWidth,
  })
}
