<template>
  <slot v-if="isSelected" />
</template>

<script setup>
import { onUnmounted, inject, ref, onMounted, computed } from 'vue'

const map = inject('$SfxMap')

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

const marker = ref(null)
const selected = ref(null)

const isSelected = computed(() => marker.value === selected.value)

onMounted(() => {
  marker.value = new window.google.maps.Marker({
    position: props.position,
    icon: _getIcon(),
    map: map.map,
  })

  window.google.maps.event.addListener(marker, 'click', handleClick)

  map.registerMarker(marker.value)
})

onUnmounted(() => {
  map.unregisterMarker(marker.value)
  marker.value.setMap(null)
})

const handleClick = () => {
  selected.value = marker.value
  map.selectMarker(marker)
}

const _getIcon = () => {
  if (!props.iconAnchor) return props.icon

  return {
    url: props.icon,
    anchor: new window.google.maps.Point(...props.iconAnchor),
  }
}
</script>
