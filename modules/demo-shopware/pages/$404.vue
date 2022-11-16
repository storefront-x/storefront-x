<template>
  <Component :is="component" v-if="component" :id="id" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'
import useRouter from '#ioc/composables/useRouter'
import useLocalePath from '#ioc/composables/useLocalePath'
import { useAttrs } from 'vue'
import isArray from '#ioc/utils/isArray'

const router = useRouter()
const localePath = useLocalePath()
const urlResover = useUrlResolver()
const attrs: any = useAttrs()

const pathMatch = (isArray(attrs.pathMatch) && attrs.pathMatch.join('/')) || attrs.pathMatch
const { id, component, redirectTo } = await urlResover(pathMatch)

if (redirectTo) {
  router.replace({ path: localePath(redirectTo) })
}
</script>
