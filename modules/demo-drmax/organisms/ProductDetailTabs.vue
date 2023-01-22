<template>
  <div class="w-full my-5 mt-0 flex text-md md:text-lg lg:text:xlg bg-blue-570 rounded-[7px] p-[12px_30px_0]">
    <MenuTab
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      class="h-[50px] flex items-center font-semibold mr-[3px] text-[16px]"
      :classes="{
        'text-primary-500 border-primary-500 bg-slate-50': toRaw(selected) === tab.component,
        'text-inherit bg-blue-575 text-blue-560 hover:text-red-555': toRaw(selected) !== tab.component,
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
