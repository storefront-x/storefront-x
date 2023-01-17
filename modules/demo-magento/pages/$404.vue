<template>
  <Component :is="component" v-if="component" :id="id" :relative-url="relativeUrl" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'
import { useAttrs } from 'vue'
import isArray from '#ioc/utils/isArray'

const urlResover = useUrlResolver()
const attrs: any = useAttrs()

const pathMatch = (isArray(attrs.pathMatch) && attrs.pathMatch.join('/')) || attrs.pathMatch

const { id, component, relativeUrl } = await urlResover(pathMatch)
</script>
