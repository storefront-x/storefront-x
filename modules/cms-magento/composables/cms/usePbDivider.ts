import { computed, reactive } from 'vue'

export default (el: any) => {
  const color = computed(() => {
    return _lineElement.value.style.borderColor
  })

  const thickness = computed(() => {
    return _lineElement.value.style.borderWidth
  })

  const width = computed(() => {
    return _lineElement.value.style.width
  })

  const _lineElement = computed(() => {
    return el.querySelector('[data-element=line]')
  })

  return reactive({
    color,
    thickness,
    width,
  })
}
