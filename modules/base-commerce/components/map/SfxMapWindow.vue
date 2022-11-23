<template>
  <div ref="mapWindow" class="sfx-map-window">
    <slot />
  </div>
</template>

<script setup>
import { onMounted, ref, inject, onUnmounted } from 'vue'

const map = inject('map')
const marker = inject('marker')
const selectMarker = inject('selectMarker')

const mapWindow = ref(null)
const infoWindow = ref(null)

onMounted(() => {
  infoWindow.value = new window.google.maps.InfoWindow({
    content: mapWindow.value,
  })

  window.google.maps.event.addListener(infoWindow.value, 'closeclick', handleClose)

  infoWindow.value.open(map(), marker())
})

onUnmounted(() => {
  infoWindow.value.close()
})

const handleClose = () => {
  selectMarker(null)
}
</script>
