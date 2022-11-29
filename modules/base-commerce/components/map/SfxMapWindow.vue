<template>
  <div ref="mapWindow" class="sfx-map-window">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, ref, inject, onUnmounted } from 'vue'

const map = inject('$SfxMap')
const marker = inject('$SfxMapMarker')

const mapWindow = ref(null)
const infoWindow = ref(null)

onMounted(() => {
  infoWindow.value = new window.google.maps.InfoWindow({
    content: mapWindow.value,
  })

  window.google.maps.event.addListener(infoWindow.value, 'closeclick', handleClose)

  infoWindow.value.open(map.map, marker.marker)
})

onUnmounted(() => {
  infoWindow.value.close()
})

const handleClose = () => {
  map.selectMarker(null)
}
</script>
