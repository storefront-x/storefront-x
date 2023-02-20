import { computed, reactive } from 'vue'

export default (el: HTMLElement) => {
  const blockId = computed(() => {
    return el.children[0].getAttribute('data-uids')
  })

  return reactive({
    blockId,
  })
}
