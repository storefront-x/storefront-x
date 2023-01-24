import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'

export default (el: HTMLElement) => {
  const pbBlock = usePbBlock(el)

  const headingType = computed(() => {
    return pbBlock.getTagName(el)
  })

  const headingText = computed(() => {
    return pbBlock.getTextContent(el)
  })

  return reactive({
    headingType,
    headingText,
  })
}
