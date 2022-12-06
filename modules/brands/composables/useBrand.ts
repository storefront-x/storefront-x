import { computed, reactive, Ref } from 'vue'
import ToBrand from '#ioc/mappers/ToBrand'
import useLocalePath from '#ioc/composables/useLocalePath'

export default (brand: Ref<ReturnType<typeof ToBrand>>) => {
  const localePath = useLocalePath()

  const id = computed(() => brand.value.id)

  const name = computed(() => brand.value.name)

  const description = computed(() => brand.value.description)

  const image = computed(() => brand.value.image)

  const urlKey = computed(() => brand.value.urlKey)

  const urlPath = computed(() => `/${urlKey.value}`)

  const breadcrumbs = computed(() => [
    {
      title: 'Brands',
      link: localePath('brands'),
    },
  ])

  return reactive({
    id,
    name,
    description,
    image,
    urlKey,
    urlPath,
    breadcrumbs,
  })
}
