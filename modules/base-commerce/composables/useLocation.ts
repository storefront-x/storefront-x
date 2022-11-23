import { onMounted, ref } from 'vue'

export default () => {
  const location = ref(null)

  onMounted(() => {
    if (!('geolocation' in navigator)) return

    navigator.geolocation.getCurrentPosition((position: any) => (location.value = position.coords))
  })

  return {
    location,
  }
}
