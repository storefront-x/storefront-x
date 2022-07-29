<template>
  <div class="flex">
    <a href="/" class="p-2" :class="isOpen ? 'text-primary-400' : 'text-gray-400'" @click.prevent="toggle">
      <span class="sr-only">{{ t('Search') }}</span>
      <OutlineSearch class="text-primary-600" />
    </a>

    <div v-if="isOpen" class="absolute top-12 inset-x-0 bg-white border-b-2 border-primary-400 shadow-md p-4 z-10">
      <SearchBar :mobile="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import useI18n from '#ioc/composables/useI18n'
import OutlineSearch from '#ioc/icons/OutlineSearch'
import SearchBar from '#ioc/molecules/SearchBar'
import { ref } from 'vue'

const { t } = useI18n()

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<i18n lang="yaml">
cs-CZ:
  Search: Vyhledat
</i18n>
