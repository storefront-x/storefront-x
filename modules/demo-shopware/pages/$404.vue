<template>
  <Component :is="component" v-if="component" :id="id" />
  <NotFound v-else />
</template>

<script setup lang="ts">
import NotFound from '#ioc/templates/NotFound'
import useUrlResolver from '#ioc/services/useUrlResolver'
import useRouter from '#ioc/composables/useRouter'
import useLocalePath from '#ioc/composables/useLocalePath'

const props = defineProps({
  resolvePath: {
    type: String,
    required: true,
    default: 'home',
  },
})

const router = useRouter()
const localePath = useLocalePath()
const urlResover = useUrlResolver()

const { id, component, redirectTo } = await urlResover(props.resolvePath)

if (redirectTo) {
  router.replace({ path: localePath(redirectTo) })
}
</script>
