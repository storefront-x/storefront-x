<template>
  <Container class="mt-2 mb-8 md:mt-3 md:mb-10">
    <Breadcrumbs :breadcrumbs="category.breadcrumbs" />

    <h1 data-cy="title">{{ category.name }}</h1>
    <div class="bg-blue-570 rounded-[7px] p-[12px_30px_0] flex">
      <button
        :class="{ 'text-inherit bg-blue-575 text-blue-560 hover:text-red-555': productTab }"
        class="sm:px-2 px-2 md:px-4 py-2 hover:cursor-pointer hover:border-primary-500 bg-white text-primary-500 border-primary-500 bg-slate-50 h-[50px] flex items-center font-semibold mr-[3px] text-[16px] h-[50px] flex items-center font-semibold mr-[3px] text-[16px]"
        @click="toggleSwitch"
      >
        Kategorie <span class="pl-1">({{ category.children.length }})</span>
      </button>
      <button
        :class="{ 'text-inherit bg-blue-575 text-blue-560 hover:text-red-555': categoryTab }"
        class="sm:px-2 px-2 md:px-4 py-2 hover:cursor-pointer hover:border-primary-500 bg-white text-primary-500 border-primary-500 bg-slate-50 h-[50px] flex items-center font-semibold mr-[3px] text-[16px] h-[50px] flex items-center font-semibold mr-[3px] text-[16px]"
        @click="toggleSwitch"
      >
        Produkty <span class="pl-1"> ({{ totalCount }}) </span>
      </button>
    </div>

    <CategoryInfo v-if="categoryTab" :category="category" />

    <div v-if="productTab" class="mt-4">
      <ProductListing :products="products" :aggregations="aggregations" :total-count="totalCount">
        <template #bellow-products>
          <Description v-if="category.description" :description="category.description" />
        </template>
      </ProductListing>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from '#ioc/atoms/Container'
import Breadcrumbs from '#ioc/molecules/Breadcrumbs'
import CategoryInfo from '#ioc/molecules/CategoryInfo'
import ToCategory from '#ioc/mappers/ToCategory'
import ToProduct from '#ioc/mappers/ToProduct'
import useHead from '#ioc/composables/useHead'
import { computed, PropType, ref } from 'vue'
import useCategory from '#ioc/composables/useCategory'
import useCategorySchema from '#ioc/composables/schemaOrg/useCategorySchema'
import hydrateWhenVisible from '#ioc/utils/hydration/hydrateWhenVisible'

import hydrateWhenIdle from '#ioc/utils/hydration/hydrateWhenIdle'

const ProductListing = hydrateWhenIdle(() => import('#ioc/organisms/ProductListing'))
const Description = hydrateWhenVisible(() => import('#ioc/atoms/Description'))

const props = defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof ToCategory>>,
    required: true,
  },
  products: {
    type: Array as PropType<ReturnType<typeof ToProduct>[]>,
    required: true,
  },
  aggregations: {
    type: Array,
    default: () => [],
  },
  totalCount: {
    type: Number,
    required: true,
  },
})

const category = useCategory(computed(() => props.category))

const categoryTab = ref(true)
const productTab = ref(false)

const toggleSwitch = () => {
  if (categoryTab.value) {
    categoryTab.value = false
    productTab.value = true
  } else {
    categoryTab.value = true
    productTab.value = false
  }
}

useCategorySchema(category)

useHead({
  title: props.category.name,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: props.category.meta.description,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: props.category.meta.keywords,
    },
  ],
})
</script>
