<template>
  <Link
    v-if="productComparisonMagentoStore.items.length"
    :to="localePath('compare-products')"
    class="relative mr-0 p-2 text-gray-400 hover:text-gray-500"
    data-cy="micro-compare-products"
  >
    <span class="sr-only">{{ t('Compare') }}</span>
    <div class="rounded-lg border-2 p-2 border-none border-gray-100 lg:border-solid hover:bg-gray-100">
      <OutlineScale stroke-width="2" class="text-primary-500" />
    </div>
    <span
      v-if="productComparisonMagentoStore.items.length"
      class="absolute top-0 right-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
      data-cy="micro-compare-products"
    >
      {{ productComparisonMagentoStore.items.length }}
    </span>
  </Link>
</template>

<script setup lang="ts">
import Link from '#ioc/atoms/Link'
import OutlineScale from '#ioc/icons/OutlineScale'
import useI18n from '#ioc/composables/useI18n'
import useLocalePath from '#ioc/composables/useLocalePath'
import useProductComparisonMagentoStore from '#ioc/stores/useProductComparisonMagentoStore'

const { t } = useI18n()

const localePath = useLocalePath()
const productComparisonMagentoStore = useProductComparisonMagentoStore()
</script>

<i18n lang="yaml">
cs-CZ:
  Compare: Srovnání
</i18n>
