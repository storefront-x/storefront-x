<template>
  <div v-bind="$attrs">
    <slot v-bind="{ getUrlFor, currentStore, stores }" />
  </div>
</template>

<script setup lang="ts">
import VUE_I18N_DIFFERENT_DOMAINS from '#ioc/config/VUE_I18N_DIFFERENT_DOMAINS'
import { computed } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import VUE_I18N_LOCALES from '#ioc/config/VUE_I18N_LOCALES'
import useRoute from '#ioc/composables/useRoute'
import useLocalePath from '#ioc/composables/useLocalePath'
import useSwitchLocalePath from '#ioc/composables/useSwitchLocalePath'

const { locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const stores = computed(() => {
  return VUE_I18N_LOCALES
})

const currentStore = computed(() => stores.value.find((item) => item.locale === locale.value))

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
