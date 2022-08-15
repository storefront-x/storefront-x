import { computed, reactive } from 'vue'

export default (props: any) => {
  const content = computed(() => {
    return props.data.data?.content ?? ''
  })

  const alignSelf = computed(() => {
    if (!props.data.config?.verticalAlign?.value) {
      return ''
    }
    return `align-self: ${props.data.config?.verticalAlign.value}`
  })

  return reactive({
    content,
    alignSelf,
  })
}
