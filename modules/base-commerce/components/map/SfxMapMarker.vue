<template>
  <slot v-if="isSelected" />
</template>

<script setup>
import { onUnmounted, inject, ref, onMounted, computed, provide, reactive } from 'vue'

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
  selected: {
    type: Object,
    default: () => ({}),
  },
})

const marker = ref(null)

const isSelected = computed(() => {
  return marker.value === props.selected
})

onMounted(() => {
  marker.value = new window.google.maps.Marker({
    position: props.position,
    icon: _getIcon(),
    map: map.map,
  })

  window.google.maps.event.addListener(marker.value, 'click', handleClick)

  map.registerMarker(marker.value)
})

onUnmounted(() => {
  map.unregisterMarker(marker.value)
  marker.value.setMap(null)
})

const handleClick = () => {
  map.selectMarker(marker)
}

const _getIcon = () => {
  if (!props.iconAnchor) return props.icon

  return {
    url: props.icon,
    anchor: new window.google.maps.Point(...props.iconAnchor),
  }
}

provide(
  '$SfxMapMarker',
  reactive({
    marker,
  }),
)
</script>
