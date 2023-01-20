import usePbBlock from '#ioc/composables/cms/usePbBlock'
import { computed, reactive } from 'vue'

export default (el: any) => {
  const pbBlock = usePbBlock(el)

  const minHeight = computed(() => {
    return el.style.minHeight || undefined
  })

  const justifyContent = computed(() => {
    return el.style.justifyContent || undefined
  })

  const background = computed(() => {
    return pbBlock.getBackground(_innerElement.value)
  })

  const advanced = computed(() => {
    return pbBlock.getAdvanced(_innerElement.value)
  })

  const _innerElement = computed(() => {
    return appearance.value === 'contained' ? el.querySelector('[data-element="inner"]') : el
  })

  const appearance = computed(() => {
    return pbBlock.getAppearance(el)
  })

  return reactive({
    minHeight,
    justifyContent,
    background,
    advanced,
    appearance,
  })
}
