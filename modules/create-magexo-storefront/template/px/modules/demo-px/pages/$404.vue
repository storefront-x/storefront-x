<template>
  <Component :is="component" v-if="component" :id="id" :entity-uid="entityUid" :relative-url="relativeUrl" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useRoute from '#ioc/composables/useRoute'
import useUrlResolver from '#ioc/services/useUrlResolver'
import isArray from '#ioc/utils/isArray'

const route = useRoute()
const urlResover = useUrlResolver()

const pathMatch = isArray(route.params.pathMatch) ? route.params.pathMatch.join('/') : (route.params.pathMatch ?? '/')

const { id, entityUid, component, relativeUrl } = await urlResover(pathMatch)
</script>
