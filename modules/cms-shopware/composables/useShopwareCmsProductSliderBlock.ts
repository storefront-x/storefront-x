import { computed, reactive } from 'vue'

export default (props: any) => {
  const ids = computed(() => props.data.slots[0].data.products.map((item: any) => item.id))

  return reactive({
    ids,
  })
}
