import ToCategory from '#ioc/mappers/ToCategory'
import { computed, reactive, Ref } from 'vue'

export default (category: Ref<ReturnType<typeof ToCategory>>) => {
  const id = computed(() => category.value.id)

  const name = computed(() => category.value.name)

  const urlPath = computed(() => category.value.urlPath)

  const children = computed(() => {
    return category.value.children
  })

  const breadcrumbs = computed(() => category.value.breadcrumbs)

  return reactive({
    id,
    name,
    urlPath,
    children,
    breadcrumbs,
  })
}
