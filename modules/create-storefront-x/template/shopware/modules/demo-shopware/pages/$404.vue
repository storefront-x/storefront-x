<template>
  <Component :is="component" v-if="component" :id="id" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'
import isArray from '#ioc/utils/isArray'

const urlResover = useUrlResolver()
const props = defineProps({
  pathMatch: { type: null, default: null },
})

const pathMatch = (isArray(props.pathMatch) && props.pathMatch.join('/')) || props.pathMatch
const { id, component } = await urlResover(pathMatch)
</script>
