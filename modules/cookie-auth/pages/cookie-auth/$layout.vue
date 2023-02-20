<template>
  <SfxPageOutlet />
</template>

<script setup lang="ts">
import SfxPageOutlet from '#ioc/components/SfxPageOutlet'
import useSetResponseStatus from '#ioc/composables/useSetResponseStatus'

const setResponseStatus = useSetResponseStatus()

setResponseStatus(401)
</script>
