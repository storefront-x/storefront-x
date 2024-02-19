<template>
  <header class="bg-white border-b-2 border-primary-400 fixed top-0 md:static z-20 left-0 right-0">
    <HeaderLinks />
    <HeaderMain />
  </header>
</template>

<script setup lang="ts">
import HeaderLinks from '#ioc/molecules/HeaderLinks'
import HeaderMain from '#ioc/molecules/HeaderMain'
</script>
