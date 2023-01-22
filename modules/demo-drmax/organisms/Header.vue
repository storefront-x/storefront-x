<template>
  <header class="bg-white fixed top-0 md:static z-20 left-0 right-0">
    <HeaderMain />
    <HeaderMainMenu />
    <HeaderMenu />
  </header>
</template>

<script setup lang="ts">
import HeaderMain from '#ioc/molecules/HeaderMain'
import HeaderMenu from '#ioc/molecules/HeaderMenu'
import HeaderMainMenu from '#ioc/molecules/HeaderMainMenu'
</script>
