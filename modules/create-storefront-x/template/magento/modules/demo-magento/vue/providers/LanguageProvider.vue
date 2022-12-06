<template>
  <slot />
</template>

<script setup lang="ts">
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import useHead from '#ioc/composables/useHead'

const currentLocale = useCurrentLocale()

useHead({
  htmlAttrs: {
    lang: currentLocale.value.name,
  },
})
</script>
