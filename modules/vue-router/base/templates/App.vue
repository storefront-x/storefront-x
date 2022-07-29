<template>
  <SfxVueProviders>
    <Suspense>
      <RouterView />
    </Suspense>
  </SfxVueProviders>
</template>

<script setup lang="ts">
import SfxVueProviders from '#ioc/components/SfxVueProviders'
</script>
