<template>
  <div v-bind="$attrs">
    <slot v-bind="{ getUrlFor, currentStore, stores, setLanguage }" />
  </div>
</template>

<script setup lang="ts">
import VUE_I18N_DIFFERENT_DOMAINS from '#ioc/config/VUE_I18N_DIFFERENT_DOMAINS'
import { computed } from 'vue'
import useRoute from '#ioc/composables/useRoute'
import useLocalePath from '#ioc/composables/useLocalePath'
import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'
import useCurrentStoreProperties from '#ioc/composables/useCurrentStoreProperties'
import useSetLanguage from '#ioc/services/useSetLanguage'

const route = useRoute()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const currentStoreProperties = useCurrentStoreProperties()
const setLanguage = useSetLanguage()

const stores = computed(() => currentStoreProperties.stores)

const currentStore = computed(() => currentStoreProperties.currentStore)

const getUrlFor = (store: any) => {
  if (_isCurrent(store)) return route.fullPath
  if (_isCatchAllRoute()) {
    return VUE_I18N_DIFFERENT_DOMAINS ? `//${store.domain}/` : localePath('/', store.name)
  }
  return switchLocalePath(store.name)
}

const _isCurrent = (store: any) => {
  return currentStore?.value?.name === store.name
}

const _isCatchAllRoute = () => {
  if (!route.name) return false
  return route.name.toString().startsWith('all___')
}
</script>
