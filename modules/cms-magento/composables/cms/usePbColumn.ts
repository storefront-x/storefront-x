import { computed, reactive } from 'vue'

export default (el: HTMLElement) => {
  const width = computed(() => {
    const width = parseFloat(el.style.width)

    if (isNaN(width)) return 0

    return width / 100
  })

  const alignSelf = computed(() => {
    return el.style.alignSelf || undefined
  })

  const minHeight = computed(() => {
    return el.style.minHeight || undefined
  })

  const justifyContent = computed(() => {
    return el.style.justifyContent || undefined
  })

  return reactive({
    width,
    alignSelf,
    minHeight,
    justifyContent,
  })
}
