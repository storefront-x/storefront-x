import { computed, reactive } from 'vue'
import usePbBlock from '#ioc/composables/cms/usePbBlock'
import htmlDecode from '#ioc/utils/string/htmlDecode'

export default (el: HTMLElement) => {
  const pbBlock = usePbBlock(el)

  const innerHtml = computed(() => {
    return htmlDecode(pbBlock.getInnerHtml(el) ?? '')
  })

  return reactive({
    innerHtml,
  })
}
