<template>
  <Component :is="component" v-if="component" :resolver-data="data" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useRoute from '#ioc/composables/useRoute'
import useUrlResolver from '#ioc/services/useUrlResolver'
import isArray from '#ioc/utils/isArray'
import dynamicPages from '~/.sfx/magento/dynamicPages'
import useResource from '#ioc/composables/useResource'
import useLocalePath from '#ioc/composables/useLocalePath'
import redirect from '#ioc/utils/redirect'
import { watchEffect, computed } from 'vue'

const route = useRoute()
const localePath = useLocalePath()
const urlResover = useUrlResolver()

const pathMatch = isArray(route.params.pathMatch) ? route.params.pathMatch.join('/') : (route.params.pathMatch ?? '/')
const [data] = await useResource(
  () => pathMatch,
  (routePath) => urlResover(routePath),
)

watchEffect(() => {
  if (data.value) {
    if (data.value.redirect_code >= 300 && data.value.redirect_code <= 400) {
      redirect(localePath(data.value.relative_url), data.value.redirect_code)
    }
  }
})

const component = computed(() => {
  if (!data.value) return null
  return dynamicPages[data.value.type as keyof typeof dynamicPages] ?? null
})
</script>
