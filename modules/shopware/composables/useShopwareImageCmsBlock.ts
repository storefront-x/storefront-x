import { computed, reactive } from 'vue'

export default (props: any) => {
  const url = computed(() => {
    return props.data.config?.url?.value ?? ''
  })

  const minHeight = computed(() => {
    return `min-height: ${props.data.config?.minHeight?.value ?? '100%'}`
  })

  const newTab = computed(() => {
    return props.data.config?.newTab?.value ? '_blank' : ''
  })

  const src = computed(() => {
    return props.data.data?.media?.url ?? ''
  })

  const objectMode = computed(() => {
    return `object-fit: ${props.data.config?.displayMode?.value ?? ''}`
  })

  const isRounded = computed(() => {
    if (props.data.type === 'image-bubble-row') {
      return 'rounded'
    }
    return ''
  })

  return reactive({
    minHeight,
    url,
    newTab,
    src,
    objectMode,
    isRounded,
  })
}
