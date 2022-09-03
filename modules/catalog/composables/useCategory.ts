import ToCategory from '#ioc/mappers/ToCategory'
import { computed, reactive, Ref } from 'vue'

export default (product: Ref<ReturnType<typeof ToCategory>>) => {
  const id = computed(() => product.value.id)

  const name = computed(() => product.value.name)

  const urlPath = computed(() => product.value.urlPath)

  return reactive({
    id,
    name,
    urlPath,
  })
}
