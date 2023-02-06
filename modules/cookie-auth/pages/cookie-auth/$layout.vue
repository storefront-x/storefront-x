<template>
  <SfxLayoutOutlet />
</template>

<script setup lang="ts">
import SfxLayoutOutlet from '#ioc/components/SfxLayoutOutlet'
import useSetResponseStatus from '#ioc/composables/useSetResponseStatus'

const setResponseStatus = useSetResponseStatus()

setResponseStatus(401)
</script>
