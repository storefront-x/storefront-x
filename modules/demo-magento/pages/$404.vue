<template>
  <Component :is="component" v-if="component" :id="id" :relative-url="relativeUrl" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'

const props = defineProps({
  resolvePath: {
    type: String,
    required: true,
  },
})
const urlResover = useUrlResolver()

const { id, component, relativeUrl } = await urlResover(props.resolvePath)
</script>
