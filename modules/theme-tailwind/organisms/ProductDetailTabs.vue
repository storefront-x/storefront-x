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
const ProductParameters = defineAsyncComponent(() => import('#ioc/molecules/ProductParameters'))
const ProductReviews = defineAsyncComponent(() => import('#ioc/organisms/ProductReviews'))

const { t } = useI18n()

const selected = shallowRef(ProductDescription)

const tabs = [
  {
    name: t('Detail'),
    component: ProductDescription,
  },
  {
    name: t('Parameters'),
    component: ProductParameters,
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
  Parameters: Parametry
  Reviews: Hodnocení
  FAQ: FAQ
</i18n>
