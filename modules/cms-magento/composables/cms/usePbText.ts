import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: HTMLElement) => {
  const pbBlock = usePbBlock(el)

  const innerHtml = computed(() => {
    return pbBlock.getInnerHtml(el)
  })

  return reactive({
    innerHtml,
  })
}
