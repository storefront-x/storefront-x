import { onMounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'

export default () => {
  const coordinates: Ref<GeolocationCoordinates | null> = ref(null)

  onMounted(() => {
    if (!('geolocation' in navigator)) return

    navigator.geolocation.getCurrentPosition((position) => (coordinates.value = position.coords))
  })

  return reactive({
    coordinates,
  })
}
