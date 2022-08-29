<template>
  <div class="w-full my-5 flex text-md md:text-lg lg:text:xlg">
    <MenuTab
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :classes="{
        'text-primary-500 border-primary-500 bg-slate-50': toRaw(selected) == tab.component,
        'text-inherit': toRaw(selected) != tab.component,
      }"
      @click="selected = tab.component"
      >{{ t(tab.name) }}
    </MenuTab>
    <span class="pb-2 border-b-2 grow" />
  </div>
  <section class="px-0">
    <component :is="selected" v-bind="currentProperties" class="sm:px-0 links" />
  </section>
</template>

<script setup lang="ts">
import MenuTab from '#ioc/atoms/MenuTab'
import { computed, shallowRef, toRaw } from 'vue'
import useI18n from '#ioc/composables/useI18n'
import SfxMagentoCmsPage from '#ioc/components/SfxMagentoCmsPage'
import injectProduct from '#ioc/composables/injectProduct'
import ProductParameters from '#ioc/molecules/ProductParameters'
import ProductReviews from '#ioc/organisms/ProductReviews'

const { t } = useI18n()
const product = injectProduct()
const selected = shallowRef(SfxMagentoCmsPage)
const tabs = [
  {
    name: 'Detail',
    component: SfxMagentoCmsPage,
  },
  {
    name: 'Parameters',
    component: ProductParameters,
  },
  {
    name: 'Reviews',
    component: ProductReviews,
  },
]

const currentProperties = computed(() => {
  if (toRaw(selected.value) === SfxMagentoCmsPage) {
    return {
      cmsPage: {
        content: product.description,
      },
    }
  }
  return {}
})
</script>

<i18n lang="yaml">
cs-CZ:
  Detail: Detaily
  Parameters: Parametry
  Reviews: Hodnocení
  FAQ: FAQ
</i18n>
