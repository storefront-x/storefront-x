import { computed, reactive } from 'vue'

export default (el: HTMLElement) => {
  const color = computed(() => {
    return lineElement.value?.style.borderColor
  })

  const thickness = computed(() => {
    return lineElement.value?.style.borderWidth
  })

  const width = computed(() => {
    return lineElement.value?.style.width
  })

  const lineElement = computed(() => {
    return el.querySelector<HTMLElement>('[data-element=line]')
  })

  return reactive({
    color,
    thickness,
    width,
    lineElement,
  })
}
