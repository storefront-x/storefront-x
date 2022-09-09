<template>
  <Component :is="component" v-if="component" :id="id" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'
import useRouter from '#ioc/composables/useRouter'

const router = useRouter()

const urlResover = useUrlResolver()

const { id, component, seoPath } = await urlResover()

router.push({ path: seoPath, replace: true })
</script>
