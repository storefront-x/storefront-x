<template>
  <div v-if="marker" class="sfx-map-marker">
    <div v-if="isSelected">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, inject, ref, onMounted, provide, computed } from 'vue'

const map = inject('map')
const unregisterMarker = inject('unregisterMarker')
const registerMarker = inject('registerMarker')
const selectMarker = inject('selectMarker')

const props = defineProps({
  position: {
    type: Object,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
  iconAnchor: {
    type: Array,
    default: null,
  },
})

let marker = null
const selected = ref(null)

const isSelected = computed(() => marker === selected.value)

onMounted(() => {
  marker = new window.google.maps.Marker({
    position: props.position,
    icon: _getIcon(),
    map: map(),
  })

  window.google.maps.event.addListener(marker, 'click', handleClick)

  registerMarker(marker)
})

onUnmounted(() => {
  unregisterMarker(marker)
  marker.setMap(null)
})

const handleClick = () => {
  selected.value = marker
  selectMarker(marker)
}

const _getIcon = () => {
  if (!props.iconAnchor) return props.icon

  return {
    url: props.icon,
    anchor: new window.google.maps.Point(...props.iconAnchor),
  }
}

provide('marker', () => marker)
</script>
