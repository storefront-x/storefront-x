<template>
  <div class="w-full my-5 flex text-md md:text-lg lg:text:xlg">
    <MenuTab
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :classes="{
        'font-bold text-black border-secondary-500 bg-secondary-500': toRaw(selected) == tab.component,
        'text-black font-bold hover:bg-primary-500 hover:text-white hover:transition-all hover:duration-256 hover:ease-bezier(0.33, 0.975, 0.245, 0.91)':
          toRaw(selected) != tab.component,
      }"
      @click="selected = tab.component"
    >
      {{ tab.name }}
    </MenuTab>
    <span class="pb-2 border-b-2 grow" />
  </div>
  <section class="px-0">
    <component :is="selected" class="sm:px-0 links" />
  </section>
</template>

<script setup lang="ts">
import MenuTab from '#ioc/atoms/MenuTab'
import { defineAsyncComponent, shallowRef, toRaw } from 'vue'
import useI18n from '#ioc/composables/useI18n'

const ProductDescription = defineAsyncComponent(() => import('#ioc/molecules/ProductDescription'))
const ProductReviews = defineAsyncComponent(() => import('#ioc/organisms/ProductReviews'))

const { t } = useI18n()

const selected = shallowRef(ProductDescription)

const tabs = [
  {
    name: t('Detail'),
    component: ProductDescription,
  },
  {
    name: t('Reviews'),
    component: ProductReviews,
  },
]
</script>

<i18n lang="yaml">
cs-CZ:
  Detail: Detaily
  Specifications: Specifikace
  Reviews: Hodnocení
  FAQ: FAQ
</i18n>
