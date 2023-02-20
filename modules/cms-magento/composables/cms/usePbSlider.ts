import { computed, reactive } from 'vue'

export default (el: HTMLElement) => {
  const slides = computed(() => {
    const childNodes = []
    for (const child of el.childNodes as any) {
      childNodes.push(child)
    }
    return childNodes
  })

  const autoplay = computed(() => {
    return el.getAttribute('data-autoplay') === 'true'
  })

  const autoplaySpeed = computed(() => {
    return parseInt(el.getAttribute('data-autoplay-speed') ?? '')
  })

  const fade = computed(() => {
    return el.getAttribute('data-fade') === 'true'
  })

  const infiniteLoop = computed(() => {
    return el.getAttribute('data-infinite-loop') === 'true'
  })

  const showArrows = computed(() => {
    return el.getAttribute('data-show-arrows') === 'true'
  })

  const showDots = computed(() => {
    return el.getAttribute('data-show-dots') === 'true'
  })

  return reactive({
    slides,
    autoplay,
    autoplaySpeed,
    fade,
    infiniteLoop,
    showArrows,
    showDots,
  })
}
