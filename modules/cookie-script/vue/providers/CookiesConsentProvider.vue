<template>
  <slot />
</template>

<script setup lang="ts">
import useHead from '#ioc/composables/useHead'
import COOKIE_SCRIPT_ID from '#ioc/config/COOKIE_SCRIPT_ID'

useHead({
  script: [
    {
      src: `//cdn.cookie-script.com/s/${COOKIE_SCRIPT_ID}.js`,
      charset: 'UTF-8',
      type: 'text/javascript',
    },
  ],
})
</script>
