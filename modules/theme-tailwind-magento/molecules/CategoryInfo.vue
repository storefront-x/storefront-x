<template>
  <div>
    <h1 data-cy="title">{{ category.name }}</h1>
    <div class="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 xl:grid-cols-6 xl:gap-6 mt-5 mb-5 mb-0">
      <CategoryButton
        v-for="(item, index) in category.children"
        :key="index"
        :category="item"
        class="text-black"
        :class="{
          'hidden md:block': index >= 4 && isMobileCategoryOpen === false,
          'block': index < 4 || isMobileCategoryOpen === true,
        }"
      />
    </div>
    <div v-if="category.children.length >= 4" class="my-5 md:hidden">
      <button
        v-if="!isMobileCategoryOpen"
        class="md:hidden text-left flex justify-between items-center"
        @click="isMobileCategoryOpen = true"
      >
        {{ t('More categories') }}
        <SolidArrowDownIcon class="flex-shrink-0 -mr-1 ml-1 h-5 w-5" />
      </button>

      <button
        v-if="isMobileCategoryOpen"
        class="md:hidden text-left flex justify-between items-center"
        @click="isMobileCategoryOpen = false"
      >
        {{ t('Fewer categories') }}
        <SolidArrowUpIcon class="flex-shrink-0 -mr-1 ml-1 h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryButton from '#ioc/molecules/CategoryButton'
import SolidArrowDownIcon from '#ioc/icons/SolidArrowDown'
import SolidArrowUpIcon from '#ioc/icons/SolidArrowUp'
import useI18n from '#ioc/composables/useI18n'
import { PropType, ref } from 'vue'
import useCategory from '#ioc/composables/useCategory'

const { t } = useI18n()

defineProps({
  category: {
    type: Object as PropType<ReturnType<typeof useCategory>>,
    required: true,
  },
})

const isMobileCategoryOpen = ref(false)
</script>

<i18n lang="yaml">
cs-CZ:
  More categories: Více kategorií
  Fewer categories: Méně kategorií
</i18n>
