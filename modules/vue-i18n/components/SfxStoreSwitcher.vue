<template>
  <slot v-bind="{ stores, currentStore, switchToStore }" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useCurrentLocale from '#ioc/composables/useCurrentLocale'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import useSwitchToStore from '#ioc/services/useSwitchToStore'

const currentLocale = useCurrentLocale()
const switchToStore = useSwitchToStore()

const stores = computed(() => VUE_I18N_LOCALES)

const currentStore = computed(() => currentLocale.value)
</script>
