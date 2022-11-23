<template>
  <div ref="el" class="sfx-map" v-bind="$attrs" />
  <slot v-if="map" />
</template>

<script setup>
import { onMounted, ref, nextTick, provide, reactive } from 'vue'
import once from '#ioc/utils/once'
import loadScript from '#ioc/utils/dom/loadScript'
import GOOGLE_API_KEY from '#ioc/config/GOOGLE_API_KEY'

const props = defineProps({
  zoom: {
    type: Number,
    default: 12,
  },
  center: {
    type: Object,
    default: () => ({
      lat: 50.08804,
      lng: 14.42076,
    }),
  },
  fullscreenControl: {
    type: Boolean,
    default: true,
  },
  streetViewControl: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['current-location', 'select'])

const el = ref(null)
const map = ref(null)
const markers = ref([])
const centerToCurrentLocationListener = ref(null)

onMounted(async () => {
  await once(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`, loadScript)

  await initMap()
})

const initMap = async () => {
  map.value = new window.google.maps.Map(el.value, {
    zoom: props.zoom,
    center: props.center,
    fullscreenControl: props.fullscreenControl,
    streetViewControl: props.streetViewControl,
  })

  centerToCurrentLocationListener.value = map.value.addListener('bounds_changed', centerToCurrentLocation)

  await fitMarkers()
}

const registerMarker = (marker) => {
  markers.value.push(marker)
}

const unregisterMarker = (marker) => {
  markers.value = markers.value.filter((m) => m !== marker)
}

const selectMarker = (marker) => {
  if (!marker) {
    emit('select', null)
    return
  }

  for (const m of markers.value) {
    if (m === marker.value) {
      emit('select', m)
      break
    }
    emit('select', null)
  }
}

const fitMarkers = async () => {
  // Wait for the markers to be rendered
  await nextTick()

  const markerBounds = new window.google.maps.LatLngBounds()

  for (const marker of markers.value) {
    markerBounds.extend(marker.position)
  }

  map.value.fitBounds(markerBounds)
}

const centerToCurrentLocation = () => {
  centerToCurrentLocationListener.value.remove()

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = { lat: position.coords.latitude, lng: position.coords.longitude }

      map.value.setCenter(location)
      map.value.setZoom(props.zoom)

      emit('current-location', location)
    })
  }
}

provide(
  '$SfxMap',
  reactive({
    map,
    registerMarker,
    unregisterMarker,
    selectMarker,
  }),
)
</script>
