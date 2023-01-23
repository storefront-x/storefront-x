<template>
  <div class="flex">
    <div
      class="absolute top-[3.75rem] lg:top-12 inset-x-0 bg-white border-b-2 border-primary-400 shadow-md p-2.5 pt-0 lg:p-4 z-10 bg-primary-500 -left-4 lg:left-0 -right-4 lg:right-0"
    >
      <SearchBar :mobile="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '#ioc/molecules/SearchBar'
</script>

<i18n lang="yaml">
cs-CZ:
  Search: Vyhledat
</i18n>
