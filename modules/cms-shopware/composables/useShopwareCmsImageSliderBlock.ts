import { computed, reactive } from 'vue'

export default (props: any) => {
  const slides = computed(() => props.data.slots[0].data.sliderItems)

  const height = computed(() => Number(props.data.slots[0].config.minHeight.value.replace('px', '')))

  return reactive({
    slides,
    height,
  })
}
