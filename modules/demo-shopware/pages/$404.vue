<template>
  <Component :is="component" v-if="component" :id="id" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'
import useRouter from '#ioc/composables/useRouter'
import useLocalePath from '#ioc/composables/useLocalePath'

const router = useRouter()
const localePath = useLocalePath()

const urlResover = useUrlResolver()

const { id, component, seoPath } = await urlResover()

const path = localePath(seoPath ? seoPath : '/')

router.push({ path: path.fullPath, replace: true })
</script>
