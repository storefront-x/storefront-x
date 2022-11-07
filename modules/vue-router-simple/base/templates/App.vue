<template>
  <SfxVueProviders>
    <Suspense>
      <Component :is="route.$page.component" />
    </Suspense>
  </SfxVueProviders>
</template>

<script setup lang="ts">
import SfxVueProviders from '#ioc/components/SfxVueProviders'
import useRoute from '#ioc/composables/useRoute'

const route = useRoute()
</script>
